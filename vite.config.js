import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base:
    mode === "production"
      ? "/pages/Gaming-for-Electric-Power-Grids/CurrentCrisis/"
      : "/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    rollupOptions: {
      // Make sure Vite doesn't try to process the Unity WebGL files
      external: [],
    },
  },
  // Copy Unity files to the output directory during build
  publicDir: 'public',
}));
