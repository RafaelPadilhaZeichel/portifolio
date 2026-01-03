import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // O nome aqui deve ser igual ao do link do GitHub
  base: "/portifolio/", 
})