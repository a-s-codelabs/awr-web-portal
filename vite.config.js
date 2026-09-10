import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/awr/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist/awr',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://asuniquegroup.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})