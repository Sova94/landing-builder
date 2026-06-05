# Landing Builder - Запуск Frontend
# PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Landing Builder - Frontend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location frontend

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
Write-Host "Запуск Frontend сервера..." -ForegroundColor Green
Write-Host "Приложение будет доступно на: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Нажмите Ctrl+C для остановки" -ForegroundColor Yellow
Write-Host ""

npm run dev
