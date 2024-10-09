// @ts-ignore
import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'

export default defineConfig({
  // base: '/Luban/',
  // build: {
  //     outDir: 'docs',
  // },
  optimizeDeps: {
    include: []
  },
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: "import React from 'react'",
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    }
  }
})
