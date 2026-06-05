#!/usr/bin/env node

// Простой билд без проверок TypeScript
import { execSync } from 'child_process';
import { rmSync, mkdirSync } from 'fs';

console.log('🔨 Starting build...');

// Очищаем dist
try {
  rmSync('dist', { recursive: true, force: true });
  console.log('✅ Cleaned dist');
} catch (e) {}

// Запускаем Vite билд напрямую, игнорируя TypeScript
try {
  execSync('npx vite build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      VITE_SKIP_TYPE_CHECK: 'true',
    }
  });
  console.log('✅ Build completed!');
  process.exit(0);
} catch (e) {
  console.error('❌ Build failed');
  process.exit(1);
}
