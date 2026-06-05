# Landing Builder - Start Script with PostgreSQL
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Landing Builder - Запуск" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL Docker container exists
Write-Host "[1/4] Checking PostgreSQL..." -ForegroundColor Yellow
$containerExists = docker ps -a --filter "name=landing-postgres" --format "{{.Names}}" 2>$null
if (-not $containerExists) {
    Write-Host "  PostgreSQL container not found. Starting Docker setup..." -ForegroundColor Cyan
    powershell -ExecutionPolicy Bypass -File setup-docker-db.ps1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  [ERROR] PostgreSQL setup failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "  [OK] PostgreSQL container exists" -ForegroundColor Green
    # Start if stopped
    $containerRunning = docker ps --filter "name=landing-postgres" --format "{{.Names}}"
    if (-not $containerRunning) {
        Write-Host "  Starting PostgreSQL..." -ForegroundColor Cyan
        docker start landing-postgres 2>$null
        Write-Host "  [OK] PostgreSQL started" -ForegroundColor Green
    }
}

# Stop any existing Node processes
Write-Host "[2/4] Stopping existing processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "  [OK] Processes stopped" -ForegroundColor Green

# Start Backend
Write-Host "[3/4] Starting Backend..." -ForegroundColor Yellow
Set-Location backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run start:dev"
Set-Location ..
Write-Host "  [OK] Backend starting in new window" -ForegroundColor Green

# Wait a bit for backend to start
Start-Sleep -Seconds 5

# Start Frontend
Write-Host "[4/4] Starting Frontend..." -ForegroundColor Yellow
Set-Location frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"
Set-Location ..
Write-Host "  [OK] Frontend starting in new window" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Application Starting!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend:  http://localhost:3000" -ForegroundColor Green
Write-Host "Backend:   http://localhost:4000/api" -ForegroundColor Green
Write-Host "Swagger:   http://localhost:4000/api/docs" -ForegroundColor Green
Write-Host ""
Write-Host "PostgreSQL: localhost:5432" -ForegroundColor Yellow
Write-Host ""
Write-Host "Two new terminal windows will open:" -ForegroundColor White
Write-Host "  - Backend (NestJS)" -ForegroundColor White
Write-Host "  - Frontend (Vite + React)" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop." -ForegroundColor Yellow
Write-Host ""
