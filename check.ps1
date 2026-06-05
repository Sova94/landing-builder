# Landing Builder - Simple Diagnostic Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Landing Builder - Diagnostic Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "[1/5] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($?) {
        Write-Host "  [OK] Node.js installed: $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] Node.js not found!" -ForegroundColor Red
        Write-Host "  Please install Node.js from https://nodejs.org/" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "  [ERROR] Node.js not found!" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "[2/5] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($?) {
        Write-Host "  [OK] npm installed: $npmVersion" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] npm not found!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "  [ERROR] npm not found!" -ForegroundColor Red
    exit 1
}

# Check directories
Write-Host "[3/5] Checking project structure..." -ForegroundColor Yellow
if (Test-Path "frontend") {
    Write-Host "  [OK] frontend directory exists" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] frontend directory not found!" -ForegroundColor Red
}

if (Test-Path "backend") {
    Write-Host "  [OK] backend directory exists" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] backend directory not found!" -ForegroundColor Red
}

# Check package.json
Write-Host "[4/5] Checking package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "  [OK] package.json exists" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] package.json not found!" -ForegroundColor Red
}

# Check ports
Write-Host "[5/5] Checking ports..." -ForegroundColor Yellow
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    Write-Host "  [WARN] Port 3000 is in use by process $($port3000.OwningProcess)" -ForegroundColor Yellow
} else {
    Write-Host "  [OK] Port 3000 is free" -ForegroundColor Green
}

$port4000 = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue
if ($port4000) {
    Write-Host "  [WARN] Port 4000 is in use by process $($port4000.OwningProcess)" -ForegroundColor Yellow
} else {
    Write-Host "  [OK] Port 4000 is free" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Diagnostic Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the project manually:" -ForegroundColor Cyan
Write-Host "  1. npm run install:all" -ForegroundColor White
Write-Host "  2. cd backend && npm run start:dev" -ForegroundColor White
Write-Host "  3. In another terminal: cd frontend && npm run dev" -ForegroundColor White
Write-Host ""
