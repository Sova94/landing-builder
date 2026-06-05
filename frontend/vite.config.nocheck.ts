import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Плагин который отключает TypeScript checker
const NoTypeCheckPlugin = () => ({
  name: 'no-type-check',
  config: () => ({
    esbuild: {
      logLevel: 'silent',
    },
  }),
  // Отключаем type checking в dev
  configureServer(server) {
    server.config.define = {
      ...server.config.define,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }
  },
})

export default defineConfig({
  plugins: [react(), NoTypeCheckPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-dnd': ['@dnd-kit/core', '@dnd-kit/sortable'],
          'vendor-monaco': ['@monaco-editor/react'],
          'vendor-motion': ['framer-motion'],
        },
      },
      onwarn() {}, // Игнорируем все предупреждения
    },
  },
  define: {
    'process.env': {}
  },
  esbuild: {
    logLevel: 'silent',
    keepNames: true,
    drop: ['debugger'],
  },
  optimizeDeps: {
    esbuildOptions: {
      logLevel: 'silent',
    }
  }
})
