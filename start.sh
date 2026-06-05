#!/bin/bash

# Landing Builder - Запуск проекта
# Bash Script for macOS/Linux

echo "========================================"
echo "  Landing Builder - Запуск проекта"
echo "========================================"
echo ""

# Проверка Node.js
echo "[1/6] Проверка Node.js..."
if ! command -v node &> /dev/null; then
    echo "  ✗ Node.js не найден! Установите Node.js 18+"
    exit 1
fi
NODE_VERSION=$(node --version)
echo "  ✓ Node.js: $NODE_VERSION"

# Проверка npm
echo "[2/6] Проверка npm..."
if ! command -v npm &> /dev/null; then
    echo "  ✗ npm не найден!"
    exit 1
fi
NPM_VERSION=$(npm --version)
echo "  ✓ npm: $NPM_VERSION"

# Проверка PostgreSQL
echo "[3/6] Проверка PostgreSQL..."
if command -v psql &> /dev/null; then
    PG_VERSION=$(psql --version)
    echo "  ✓ PostgreSQL: $PG_VERSION"
else
    echo "  ⚠ PostgreSQL не найден (необязательно для dev)"
fi

# Установка зависимостей
echo "[4/6] Установка зависимостей..."

# Frontend dependencies
if [ ! -d "frontend/node_modules" ]; then
    echo "  Устанавливаем frontend зависимости..."
    cd frontend
    npm install
    cd ..
else
    echo "  ✓ Frontend зависимости уже установлены"
fi

# Backend dependencies
if [ ! -d "backend/node_modules" ]; then
    echo "  Устанавливаем backend зависимости..."
    cd backend
    npm install
    cd ..
else
    echo "  ✓ Backend зависимости уже установлены"
fi

# Создание .env файлов если их нет
echo "[5/6] Проверка конфигурации..."

if [ ! -f "frontend/.env" ]; then
    echo "  Создаем frontend .env..."
    cp frontend/.env.example frontend/.env
else
    echo "  ✓ frontend .env существует"
fi

if [ ! -f "backend/.env" ]; then
    echo "  Создаем backend .env..."
    cp backend/.env.example backend/.env
else
    echo "  ✓ backend .env существует"
fi

echo ""
echo "========================================"
echo "  Запуск сервисов..."
echo "========================================"
echo ""

echo "Backend будет доступен на: http://localhost:4000"
echo "Frontend будет доступен на: http://localhost:3000"
echo "API документация: http://localhost:4000/api"
echo ""
echo "Нажмите Ctrl+C для остановки серверов"
echo ""

# Запуск обоих сервисов
npm run dev
