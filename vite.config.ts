import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  base: '/budge-book/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'budget-book',
        short_name: 'budget',
        start_url: '.', // base設定がある場合、ドット一つで「現在の階層」を指せます
        scope: './',
        display: 'standalone',
      }
    }),
    tsconfigPaths()
  ],
  build: {
    rollupOptions: {
      output: {
        // node_modules を vendor という名前の別ファイルに切り出す設定
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
