import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE_URL ? env.VITE_BASE_URL.replace(/\/?$/, "/") : "/";
  const devHost = env.VITE_DEV_HOST || "127.0.0.1";

  return {
    base,
    server: {
      host: devHost,
      port: 8080,
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
      sourcemap: false,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (id.includes("react-router-dom")) return "router";
            if (id.includes("react")) return "react";
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
