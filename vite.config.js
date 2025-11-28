import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Jeśli wdrażasz na głównej domenie, użyj '/'
  // Jeśli wdrażasz w podfolderze, użyj '/nazwa-folderu/'
  base: process.env.VITE_BASE_PATH || '/',
})
