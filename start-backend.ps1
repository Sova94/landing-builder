# Landing Builder - Запуск Backend
# PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Landing Builder - Backend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location backend

# Проверка зависимостей
if (-not (Test-Path "node_modules")) {
    Write-Host "Установка зависимостей..." -ForegroundColor Yellow
    npm install
}

# Проверка .env
if (-not (Test-Path ".env")) {
    Write-Host "Создаем .env файл..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
}

Write-Host ""
Write-Host "Запуск Backend сервера..." -ForegroundColor Green
Write-Host "API будет доступен на: http://localhost:4000" -ForegroundColor Green
Write-Host "Swagger документация: http://localhost:4000/api" -ForegroundColor Green
Write-Host ""
Write-Host "Нажмите Ctrl+C для остановки" -ForegroundColor Yellow
Write-Host ""

npm run start:dev
