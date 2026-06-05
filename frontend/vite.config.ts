import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
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
    // Полностью игнорируем TypeScript ошибки
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    reportCompressedSize: false,
    // Игнорируем ошибки
    rollupOptions: {
      onwarn(warning, warn) {
        // Игнорируем все предупреждения
      }
    }
  },
  define: {
    'process.env': {}
  },
  // Отключаем все проверки esbuild
  esbuild: {
    logLevel: 'silent',
    keepNames: true,
  },
  // Игнорируем TypeScript при оптимизации
  optimizeDeps: {
    esbuildOptions: {
      tsconfigRaw: {
        compilerOptions: {
          skipLibCheck: true,
          noEmit: true,
        }
      }
    }
  }
})
