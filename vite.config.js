import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "path"
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
function resolve(dir) {
  return path.join(process.cwd(), dir)
}
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [fileURLToPath(new URL('./src/components/svg-icon/svg', import.meta.url))],
      symbolId:"icon-[name]"
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/var.scss";',
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
