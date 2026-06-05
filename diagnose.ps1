# Landing Builder - Диагностика
# PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Landing Builder - Диагностика" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$problems = @()

# Проверка Node.js
Write-Host "[1/8] Проверка Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Node.js установлен: $nodeVersion" -ForegroundColor Green
        
        # Проверка версии
        $majorVersion = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
        if ($majorVersion -lt 18) {
            $problems += "Node.js версия должна быть 18+, у вас: $nodeVersion"
            Write-Host "  ✗ Недостаточная версия! Требуется 18+" -ForegroundColor Red
        }
    } else {
        $problems += "Node.js не установлен"
        Write-Host "  ✗ Node.js не найден!" -ForegroundColor Red
    }
} catch {
    $problems += "Node.js не установлен"
    Write-Host "  ✗ Node.js не найден!" -ForegroundColor Red
}

# Проверка npm
Write-Host "[2/8] Проверка npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ npm установлен: $npmVersion" -ForegroundColor Green
    } else {
        $problems += "npm не установлен"
        Write-Host "  ✗ npm не найден!" -ForegroundColor Red
    }
} catch {
    $problems += "npm не установлен"
    Write-Host "  ✗ npm не найден!" -ForegroundColor Red
}

# Проверка директорий
Write-Host "[3/8] Проверка структуры проекта..." -ForegroundColor Yellow
if (Test-Path "frontend") {
    Write-Host "  ✓ Директория frontend существует" -ForegroundColor Green
} else {
    $problems += "Директория frontend не найдена"
    Write-Host "  ✗ Директория frontend не найдена!" -ForegroundColor Red
}

if (Test-Path "backend") {
    Write-Host "  ✓ Директория backend существует" -ForegroundColor Green
} else {
    $problems += "Директория backend не найдена"
    Write-Host "  ✗ Директория backend не найдена!" -ForegroundColor Red
}

# Проверка package.json
Write-Host "[4/8] Проверка package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "  ✓ package.json существует" -ForegroundColor Green
} else {
    $problems += "package.json не найден"
    Write-Host "  ✗ package.json не найден!" -ForegroundColor Red
}

# Проверка node_modules
Write-Host "[5/8] Проверка установленных зависимостей..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  ✓ Root node_modules существует" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Root node_modules не установлен (требуется npm install)" -ForegroundColor Yellow
}

if (Test-Path "frontend\node_modules") {
    Write-Host "  ✓ Frontend node_modules установлен" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Frontend node_modules не установлен (требуется npm install)" -ForegroundColor Yellow
}

if (Test-Path "backend\node_modules") {
    Write-Host "  ✓ Backend node_modules установлен" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Backend node_modules не установлен (требуется npm install)" -ForegroundColor Yellow
}

# Проверка .env файлов
Write-Host "[6/8] Проверка конфигурационных файлов..." -ForegroundColor Yellow
if (Test-Path "frontend\.env") {
    Write-Host "  ✓ frontend/.env существует" -ForegroundColor Green
} else {
    Write-Host "  ⚠ frontend/.env не существует (создастся автоматически)" -ForegroundColor Yellow
}

if (Test-Path "backend\.env") {
    Write-Host "  ✓ backend/.env существует" -ForegroundColor Green
} else {
    Write-Host "  ⚠ backend/.env не существует (создастся автоматически)" -ForegroundColor Yellow
}

# Проверка портов
Write-Host "[7/8] Проверка свободных портов..." -ForegroundColor Yellow
try {
    $port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($port3000) {
        Write-Host "  ⚠ Порт 3000 занят процессом $($port3000.OwningProcess)" -ForegroundColor Yellow
    } else {
        Write-Host "  ✓ Порт 3000 свободен" -ForegroundColor Green
    }
} catch {
    Write-Host "  ✓ Порт 3000 свободен" -ForegroundColor Green
}

try {
    $port4000 = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue
    if ($port4000) {
        Write-Host "  ⚠ Порт 4000 занят процессом $($port4000.OwningProcess)" -ForegroundColor Yellow
    } else {
        Write-Host "  ✓ Порт 4000 свободен" -ForegroundColor Green
    }
} catch {
    Write-Host "  ✓ Порт 4000 свободен" -ForegroundColor Green
}

# Проверка PostgreSQL
Write-Host "[8/8] Проверка PostgreSQL..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ PostgreSQL установлен" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ PostgreSQL не найден (можно использовать SQLite для dev)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ⚠ PostgreSQL не найден (можно использовать SQLite для dev)" -ForegroundColor Yellow
}

# Итог
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Итоги диагностики" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($problems.Count -eq 0) {
    Write-Host "✓ Все проверки пройдены успешно!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Проект готов к запуску. Выполните:" -ForegroundColor Cyan
    Write-Host "  .\start-debug.bat" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "✗ Найдены проблемы:" -ForegroundColor Red
    Write-Host ""
    $problems | ForEach-Object {
        Write-Host "  - $_" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Исправьте проблемы перед запуском." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Подробная инструкция: MANUAL_START.md" -ForegroundColor Cyan
Write-Host ""
