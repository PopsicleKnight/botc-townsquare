import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

const port = 3000;

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  root: "src",
  build: {
    copyPublicDir: true,
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    port: port,
    proxy: {
      "/api": {
        target: `${import.meta.env.VITE_BACKEND_URL}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/socket.io": {
        target: `${import.meta.env.VITE_BACKEND_URL}`,
        ws: true,
      },
    },
  },
});
