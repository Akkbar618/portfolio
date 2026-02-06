import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const MAX_SIZE_KB = Number(process.env.MAX_BUNDLE_SIZE_KB ?? 150);
const CHECK_ALL_CHUNKS = process.env.BUNDLE_CHECK_ALL === "true";
const assetsDir = path.resolve(process.cwd(), "dist/assets");

if (!existsSync(assetsDir)) {
  console.error(`Missing build output: ${assetsDir}`);
  console.error("Run `npm run build` before `npm run check:bundle`.");
  process.exit(1);
}

const jsFiles = readdirSync(assetsDir).filter((file) => file.endsWith(".js"));
if (jsFiles.length === 0) {
  console.error("No JavaScript chunks found in dist/assets.");
  process.exit(1);
}

const chunks = jsFiles
  .map((file) => {
    const filePath = path.join(assetsDir, file);
    return {
      file,
      sizeKb: statSync(filePath).size / 1024,
    };
  })
  .sort((a, b) => b.sizeKb - a.sizeKb);

console.log("Bundle chunks (raw size):");
for (const chunk of chunks) {
  console.log(` - ${chunk.file}: ${chunk.sizeKb.toFixed(2)} KB`);
}

const entryChunks = chunks.filter((chunk) => /^index-.*\.js$/.test(chunk.file));
const chunksToCheck = CHECK_ALL_CHUNKS
  ? chunks
  : entryChunks.length > 0
    ? entryChunks
    : chunks;

const overBudget = chunksToCheck.filter((chunk) => chunk.sizeKb > MAX_SIZE_KB);
if (overBudget.length > 0) {
  console.error(
    `\nBundle budget exceeded (${MAX_SIZE_KB} KB) for ${
      CHECK_ALL_CHUNKS ? "chunk(s)" : "entry chunk(s)"
    }:`
  );
  for (const chunk of overBudget) {
    console.error(` - ${chunk.file}: ${chunk.sizeKb.toFixed(2)} KB`);
  }
  process.exit(1);
}

console.log(
  `\nBundle budget OK: checked ${chunksToCheck.length} chunk(s), limit ${MAX_SIZE_KB} KB.`
);
