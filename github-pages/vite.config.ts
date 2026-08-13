import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root,
  base: "/womenWear_Fableroom/",
  publicDir: fileURLToPath(new URL("../public", import.meta.url)),
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL("../docs", import.meta.url)),
    emptyOutDir: true,
  },
});
