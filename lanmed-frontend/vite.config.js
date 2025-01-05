import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensures Vite builds to /dist (default behavior)
    emptyOutDir: true,  // Clears old files in /dist before building new ones
  }
})
