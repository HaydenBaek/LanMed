import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Output to 'dist' folder (standard for Azure deployment)
    emptyOutDir: true,  // Clears the output directory before building
  },
  define: {
    'process.env': process.env  // Passes through environment variables at runtime
  }
})
