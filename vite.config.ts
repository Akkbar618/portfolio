import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE_URL ? env.VITE_BASE_URL.replace(/\/?$/, "/") : "/";
  const devHost = env.VITE_DEV_HOST || "127.0.0.1";
  const isProd = mode === "production";
  const sourcemap = !isProd || env.VITE_SOURCEMAP === "true";
  const devPort = Number(env.VITE_DEV_PORT) || 8080;

  return {
    base,
    server: {
      host: devHost,
      port: devPort,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (id.includes("react-router") || id.includes("@remix-run/router")) return "router";
            if (id.includes("@radix-ui") || id.includes("lucide-react")) return "ui";
            return "vendor";
          },
        },
      },
    },
    esbuild: {
      drop: ["console", "debugger"],
    },
  };
});
