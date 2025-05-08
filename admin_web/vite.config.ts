import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src', // 👈 Define a pasta "src" como raiz do projeto
  plugins: [react()],
  build: {
    outDir: '../dist', // 👈 Gera a pasta dist fora da src
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.html') // 👈 Caminho corrigido do index
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 👈 Alias para importar arquivos com @
    }
  }
})
