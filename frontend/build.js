#!/usr/bin/env node

// Прямой вызов Vite с конфигом без type checking
import { execSync } from 'child_process';
import { rmSync } from 'fs';

console.log('🔨 Starting build (NO TYPE CHECKS)...');

// Очищаем dist
try {
  rmSync('dist', { recursive: true, force: true });
  console.log('✅ Cleaned dist');
} catch (e) {}

// Используем конфиг без проверок
try {
  console.log('🚀 Running Vite with nocheck config...');
  execSync('npx vite build --config vite.config.nocheck.ts', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
    shell: true,
  });
  console.log('✅ Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}
