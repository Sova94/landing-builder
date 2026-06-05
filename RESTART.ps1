# Landing Builder - Перезапуск после исправлений

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Landing Builder - Перезапуск" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Остановка всех Node процессов..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "  OK - Процессы остановлены" -ForegroundColor Green
Write-Host ""

Write-Host "[2/4] Очистка кэша Vite..." -ForegroundColor Yellow
if (Test-Path "frontend\node_modules\.vite") {
    Remove-Item -Recurse -Force "frontend\node_modules\.vite"
    Write-Host "  OK - Кэш очищен" -ForegroundColor Green
} else {
    Write-Host "  Кэш не найден (OK)" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "[3/4] Запуск Backend..." -ForegroundColor Yellow
Set-Location backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run start:dev"
Set-Location ..
Write-Host "  OK - Backend запущен в новом окне" -ForegroundColor Green
Write-Host ""

Write-Host "[4/4] Запуск Frontend..." -ForegroundColor Yellow
Set-Location frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"
Set-Location ..
Write-Host "  OK - Frontend запущен в новом окне" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Перезапуск завершен!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "Backend: http://localhost:4000/api" -ForegroundColor Green
Write-Host ""
Write-Host "Проверьте работу:" -ForegroundColor Yellow
Write-Host "  1. Откройте http://localhost:3000" -ForegroundColor White
Write-Host "  2. Попробуйте добавить виджет" -ForegroundColor White
Write-Host "  3. Кликните на виджет - откроются настройки" -ForegroundColor White
Write-Host ""
