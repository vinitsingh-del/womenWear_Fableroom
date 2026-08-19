import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

// One JS chunk, one CSS file, relative asset URLs — everything is then inlined
// into a single HTML file by scripts/inline-single-file.py
export default defineConfig({
  root,
  base: "./",
  publicDir: fileURLToPath(new URL("../public", import.meta.url)),
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL("../.singlefile", import.meta.url)),
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: fileURLToPath(new URL("./index.html", import.meta.url)),
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
        entryFileNames: "bundle.js",
        assetFileNames: "bundle.[ext]",
      },
    },
  },
});
