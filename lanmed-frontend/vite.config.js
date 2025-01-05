import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensures Vite builds to /dist (default behavior)
    emptyOutDir: true,  // Clears old files in /dist before building new ones
  },
  define: {
    'import.meta.env': {
      VITE_API_KEY: process.env.VITE_API_KEY,
      VITE_AUTH_DOMAIN: process.env.VITE_AUTH_DOMAIN,
      VITE_PROJECT_ID: process.env.VITE_PROJECT_ID,
      VITE_STORAGE_BUCKET: process.env.VITE_STORAGE_BUCKET,
      VITE_MESSAGING_SENDER_ID: process.env.VITE_MESSAGING_SENDER_ID,
      VITE_APP_ID: process.env.VITE_APP_ID
    }
  }
})
