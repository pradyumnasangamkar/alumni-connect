import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
