import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Tem que ter a barra no começo e no fim!
  base: "/meu-portifolio/", 
})