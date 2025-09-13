import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

import { VitePluginRadar } from 'vite-plugin-radar';

export default defineConfig({
  plugins: [
    VitePluginRadar({
      analytics:{
        id:"G-RCKPRQLLGW",
      },
      enableDev:true, // Optional: for debugging in development for dev tracking

    }),
    vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Path name setting
    }
  },
  base: '/sudoku_game/'
})