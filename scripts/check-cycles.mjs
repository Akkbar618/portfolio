import fs from "fs";
import path from "path";
import * as ts from "typescript";

const cwd = process.cwd();
const projectArg = process.argv[2] || "tsconfig.app.json";
const projectPath = path.resolve(cwd, projectArg);

function loadTsConfig(configPath) {
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) {
    const message = ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n");
    throw new Error(`Failed to read ${configPath}: ${message}`);
  }

  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configPath),
  );

  if (parsed.errors?.length) {
    const message = parsed.errors
      .map((err) => ts.flattenDiagnosticMessageText(err.messageText, "\n"))
      .join("\n");
    throw new Error(`Failed to parse ${configPath}:\n${message}`);
  }

  return parsed;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function relativeToRoot(root, filePath) {
  return toPosix(path.relative(root, filePath));
}

function collectModuleSpecifiers(sourceFile) {
  const specs = [];

  function visit(node) {
    if (ts.isImportDeclaration(node)) {
      if (!node.importClause?.isTypeOnly && ts.isStringLiteral(node.moduleSpecifier)) {
        specs.push(node.moduleSpecifier.text);
      }
    } else if (ts.isExportDeclaration(node)) {
      if (!node.isTypeOnly && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        specs.push(node.moduleSpecifier.text);
      }
    } else if (ts.isCallExpression(node)) {
      if (
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        node.arguments.length === 1 &&
        ts.isStringLiteral(node.arguments[0])
      ) {
        specs.push(node.arguments[0].text);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return specs;
}

function canonicalizeCycle(nodes) {
  if (nodes.length === 0) return "";
  const rotations = nodes.map((_, i) => nodes.slice(i).concat(nodes.slice(0, i)));
  const normalized = rotations.map((rotation) => rotation.join("->"));
  normalized.sort();
  return normalized[0];
}

function formatCycle(signature) {
  const parts = signature.split("->");
  return `${parts.join(" -> ")} -> ${parts[0]}`;
}

function main() {
  const parsed = loadTsConfig(projectPath);
  const compilerOptions = parsed.options;
  const fileNames = parsed.fileNames.map((file) => path.resolve(file));
  const fileSet = new Set(fileNames);
  const graph = new Map();

  const moduleResolutionHost = {
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    directoryExists: ts.sys.directoryExists,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getDirectories: ts.sys.getDirectories,
    realpath: ts.sys.realpath,
  };

  const resolveCache = new Map();

  function resolveModule(specifier, fromFile) {
    const cacheKey = `${fromFile}::${specifier}`;
    if (resolveCache.has(cacheKey)) return resolveCache.get(cacheKey);

    const result = ts.resolveModuleName(
      specifier,
      fromFile,
      compilerOptions,
      moduleResolutionHost,
    );
    const resolvedFile = result.resolvedModule?.resolvedFileName;
    const resolved = resolvedFile ? path.resolve(resolvedFile) : null;
    const finalResolved =
      resolved && !resolved.includes("node_modules") && fileSet.has(resolved) ? resolved : null;

    resolveCache.set(cacheKey, finalResolved);
    return finalResolved;
  }

  for (const file of fileNames) {
    const text = fs.readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.ES2020, true);
    const specs = collectModuleSpecifiers(sourceFile);
    const deps = new Set();

    for (const specifier of specs) {
      const resolved = resolveModule(specifier, file);
      if (resolved) deps.add(resolved);
    }

    graph.set(file, deps);
  }

  const visiting = new Set();
  const visited = new Set();
  const stack = [];
  const cycles = new Map();

  function dfs(node) {
    if (visiting.has(node)) {
      const index = stack.indexOf(node);
      const cycleNodes = stack.slice(index).map((file) => relativeToRoot(cwd, file));
      const signature = canonicalizeCycle(cycleNodes);
      if (!cycles.has(signature)) {
        cycles.set(signature, formatCycle(signature));
      }
      return;
    }

    if (visited.has(node)) return;

    visiting.add(node);
    stack.push(node);

    const deps = graph.get(node);
    if (deps) {
      for (const dep of deps) {
        dfs(dep);
      }
    }

    stack.pop();
    visiting.delete(node);
    visited.add(node);
  }

  for (const file of fileNames) {
    if (!visited.has(file)) dfs(file);
  }

  if (cycles.size > 0) {
    console.error("Import cycles detected:");
    let i = 1;
    for (const cycle of cycles.values()) {
      console.error(`${i}) ${cycle}`);
      i += 1;
    }
    process.exit(1);
  } else {
    console.log("No import cycles found.");
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
