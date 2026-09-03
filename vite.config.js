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
    proxy: {
      // Proxy GitHub stars list to avoid CORS in dev.
      // For production, configure a similar proxy on your hosting platform
      // (e.g. Netlify redirect, Vercel rewrite, or a serverless function).
      '/api/github-list': {
        target: 'https://github.com',
        changeOrigin: true,
        rewrite: () => '/stars/Jyotibrat/lists/flanora-ai',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      },
    },
  },
})

