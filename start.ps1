# Landing Builder - Скрипт запуска проекта
# PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Landing Builder - Запуск проекта" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверка Node.js
Write-Host "[1/6] Проверка Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js не найден! Установите Node.js 18+" -ForegroundColor Red
    exit 1
}

# Проверка npm
Write-Host "[2/6] Проверка npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "  ✓ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ npm не найден!" -ForegroundColor Red
    exit 1
}

# Проверка PostgreSQL
Write-Host "[3/6] Проверка PostgreSQL..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version 2>$null
    if ($pgVersion) {
        Write-Host "  ✓ PostgreSQL: $pgVersion" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ PostgreSQL не найден (необязательно для dev)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ⚠ PostgreSQL не найден (необязательно для dev)" -ForegroundColor Yellow
}

# Установка зависимостей
Write-Host "[4/6] Установка зависимостей..." -ForegroundColor Yellow

# Frontend dependencies
if (-not (Test-Path "frontend/node_modules")) {
    Write-Host "  Устанавливаем frontend зависимости..." -ForegroundColor Cyan
    Set-Location frontend
    npm install
    Set-Location ..
} else {
    Write-Host "  ✓ Frontend зависимости уже установлены" -ForegroundColor Green
}

# Backend dependencies
if (-not (Test-Path "backend/node_modules")) {
    Write-Host "  Устанавливаем backend зависимости..." -ForegroundColor Cyan
    Set-Location backend
    npm install
    Set-Location ..
} else {
    Write-Host "  ✓ Backend зависимости уже установлены" -ForegroundColor Green
}

# Создание .env файлов если их нет
Write-Host "[5/6] Проверка конфигурации..." -ForegroundColor Yellow

if (-not (Test-Path "frontend/.env")) {
    Write-Host "  Создаем frontend .env..." -ForegroundColor Cyan
    Copy-Item "frontend/.env.example" "frontend/.env"
} else {
    Write-Host "  ✓ frontend .env существует" -ForegroundColor Green
}

if (-not (Test-Path "backend/.env")) {
    Write-Host "  Создаем backend .env..." -ForegroundColor Cyan
    Copy-Item "backend/.env.example" "backend/.env"
} else {
    Write-Host "  ✓ backend .env существует" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Запуск сервисов..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Backend будет доступен на: http://localhost:4000" -ForegroundColor Green
Write-Host "Frontend будет доступен на: http://localhost:3000" -ForegroundColor Green
Write-Host "API документация: http://localhost:4000/api" -ForegroundColor Green
Write-Host ""
Write-Host "Нажмите Ctrl+C для остановки серверов" -ForegroundColor Yellow
Write-Host ""

# Запуск обоих сервисов
Set-Location ..
npm run dev
