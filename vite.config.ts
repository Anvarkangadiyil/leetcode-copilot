import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import { resolve } from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        sidepanel: resolve(__dirname, 'src/sidepanel.html'),
         content: resolve(__dirname, 'src/content.ts')
      },
      output: {
        entryFileNames: 'assets/[name].js'
      }
    },
    outDir: 'dist'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
