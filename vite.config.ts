import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Path name setting
    }
  },
  base: '/sudoku_game/'
})