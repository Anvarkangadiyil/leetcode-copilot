import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path, { resolve } from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),                // optional if you have popup.html
        sidepanel: resolve(__dirname, "sidepanel.html"),
        background: resolve(__dirname, "src/background.ts"),
        content: resolve(__dirname, "src/content.ts")
      },
      output: {
        entryFileNames: "[name].js" // Output to dist/background.js, dist/content.js, etc.
      }
    },
    outDir: "dist",
    emptyOutDir: true,
    target: "esnext", // Ensures modern JS support
    sourcemap: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
