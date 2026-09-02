import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Exclude assets from file watching — Windows locks image files
      // temporarily (antivirus/thumbnail generation) causing EBUSY crashes.
      ignored: ['**/src/assets/**'],
    },
  },
})

