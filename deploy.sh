#!/bin/bash

# 🚀 Скрипт быстрой подготовки к деплою
# Использование: ./deploy.sh

echo "🚀 Landing Builder - Подготовка к деплою"
echo "========================================"
echo ""

# Проверка что мы в правильной директории
if [ ! -f "frontend/package.json" ]; then
  echo "❌ Запустите скрипт из корневой директории landing-builder/"
  exit 1
fi

# Инициализация Git
echo "📦 Инициализация Git..."
if [ ! -d ".git" ]; then
  git init
  git branch -M main
  echo "✅ Git инициализирован"
else
  echo "✅ Git уже инициализирован"
fi

# Создание .gitignore если нет
if [ ! -f ".gitignore" ]; then
  echo "Создание .gitignore..."
  cat > .gitignore << EOF
# Dependencies
node_modules/
.pnp
.pnp.js

# Build
dist/
build/
*.tsbuildinfo

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.idea/
.vscode/
*.swp
*.swo

# Testing
coverage/
.nyc_output/

# Railway/Vercel
.vercel/
.railway/
EOF
  echo "✅ .gitignore создан"
else
  echo "✅ .gitignore уже существует"
fi

# Проверка frontend
echo ""
echo "📁 Проверка frontend..."
if [ -f "frontend/package.json" ]; then
  echo "✅ frontend/package.json найден"
else
  echo "❌ frontend/package.json не найден"
  exit 1
fi

if [ -f "frontend/vercel.json" ]; then
  echo "✅ frontend/vercel.json найден"
else
  echo "❌ frontend/vercel.json не найден"
  exit 1
fi

# Проверка backend
echo ""
echo "📁 Проверка backend..."
if [ -f "backend/package.json" ]; then
  echo "✅ backend/package.json найден"
else
  echo "❌ backend/package.json не найден"
  exit 1
fi

# Создание .env файлов если нет
echo ""
echo "🔐 Проверка .env файлов..."

if [ ! -f "frontend/.env" ]; then
  cp frontend/.env.example frontend/.env 2>/dev/null || echo "VITE_API_URL=http://localhost:4000/api" > frontend/.env
  echo "✅ frontend/.env создан"
else
  echo "✅ frontend/.env уже существует"
fi

if [ ! -f "backend/.env" ]; then
  cp backend/.env.example backend/.env 2>/dev/null || true
  echo "✅ backend/.env создан"
else
  echo "✅ backend/.env уже существует"
fi

# Commit изменений
echo ""
echo "💾 Создание коммита..."
git add .
git commit -m "chore: подготовка к деплою на Vercel + Railway" || echo "⚠️ Нет изменений для коммита"

echo ""
echo "========================================"
echo "✅ Подготовка завершена!"
echo ""
echo "📋 Следующие шаги:"
echo ""
echo "1. Создайте репозиторий на GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Запушьте код:"
echo "   git remote add origin https://github.com/ВАШ_УЗЕР/landing-builder.git"
echo "   git push -u origin main"
echo ""
echo "3. Задеплойте Frontend на Vercel:"
echo "   https://vercel.com/new"
echo "   Root Directory: frontend"
echo ""
echo "4. Задеплойте Backend на Railway:"
echo "   https://railway.app/new"
echo "   Root Directory: backend"
echo ""
echo "5. Добавьте переменные окружения (см. DEPLOY.md)"
echo ""
echo "========================================"
echo "📖 Полная инструкция: DEPLOY.md"
echo "========================================"
