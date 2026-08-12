import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "vercel-spa",
  publicDir: "../public",
  plugins: [react()],
  build: {
    outDir: "../dist-vercel",
    emptyOutDir: true,
  },
});
