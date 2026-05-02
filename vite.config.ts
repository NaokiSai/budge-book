import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/budge-book/',
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'manifest.json', // 名前を .json に固定
      injectRegister: 'auto',
      manifest: {
        name: 'おうち家計簿',
        short_name: 'budget',
        start_url: '/budge-book/', // 絶対パスでリポジトリ名を指定
        scope: '/budge-book/',     // 絶対パスでリポジトリ名を指定
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        lang: 'ja',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      // tsconfigPathsとは別に、画像用にこれを追記します
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
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
