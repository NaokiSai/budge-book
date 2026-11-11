import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  base: '/budge-book/',
  plugins: [
    tsconfigPaths(),
    react(),
    compression({
      algorithms: ['gzip', 'brotliCompress'], // 配列で指定
      include: [/\.(js|css|html|svg)$/],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'manifest.json', // 名前を .json に固定
      injectRegister: 'auto',
      manifest: {
        name: 'おうち家計簿',
        short_name: 'おうち家計簿',
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
  define: {
    // package.jsonのバージョンを環境変数として定義
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      // tsconfigPathsとは別に、画像用にこれを追記します
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. React & Router 関連
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }

            // 2. MUI コア & Emotion 関連
            if (id.includes('@mui/material') || id.includes('@emotion')) {
              return 'vendor-mui';
            }

            // 3. MUI グラフ（容量が大きいので独立させる）
            if (id.includes('@mui/x-charts-pro')) {
              return 'vendor-mui-charts';
            }

            // 4. MUI アイコン（非常にファイル数が多いため独立）
            if (id.includes('@mui/icons-material')) {
              return 'vendor-mui-icons';
            }

            // 5. 日付系や Google OAuth などのその他ライブラリ
            if (id.includes('dayjs') || id.includes('@react-oauth') || id.includes('jwt-decode')) {
              return 'vendor-libs';
            }

            // 残りの node_modules
            return 'vendor';
          }
        },
      },
    },
    // 必要に応じて警告しきい値を調整（例: 700 kB）
    chunkSizeWarningLimit: 700,
  },
})
