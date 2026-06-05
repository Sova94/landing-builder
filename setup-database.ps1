# Setup PostgreSQL Database
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup PostgreSQL Database" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is installed
Write-Host "[1/4] Checking PostgreSQL installation..." -ForegroundColor Yellow
try {
    $psqlVersion = psql --version 2>$null
    if ($?) {
        Write-Host "  [OK] PostgreSQL installed: $psqlVersion" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] PostgreSQL not found!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install PostgreSQL from:" -ForegroundColor Yellow
        Write-Host "https://www.postgresql.org/download/windows/" -ForegroundColor White
        Write-Host ""
        Write-Host "After installation, run this script again." -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "  [ERROR] PostgreSQL not found!" -ForegroundColor Red
    exit 1
}

# Check if database exists
Write-Host "[2/4] Checking database..." -ForegroundColor Yellow
$dbExists = psql -U postgres -lqt 2>$null | Select-String -Pattern "landing_builder"
if ($dbExists) {
    Write-Host "  [OK] Database 'landing_builder' exists" -ForegroundColor Green
} else {
    Write-Host "  Creating database 'landing_builder'..." -ForegroundColor Cyan
    try {
        createdb -U postgres landing_builder 2>$null
        Write-Host "  [OK] Database created" -ForegroundColor Green
    } catch {
        Write-Host "  [WARN] Could not create database automatically" -ForegroundColor Yellow
        Write-Host "  Please create it manually:" -ForegroundColor Yellow
        Write-Host "    createdb -U postgres landing_builder" -ForegroundColor White
    }
}

# Check if tables exist
Write-Host "[3/4] Checking tables..." -ForegroundColor Yellow
$tableCheck = psql -U postgres -d landing_builder -c "\dt" 2>$null
if ($tableCheck -match "users" -or $tableCheck -match "projects") {
    Write-Host "  [OK] Tables exist" -ForegroundColor Green
} else {
    Write-Host "  [INFO] No tables found - TypeORM will create them on startup" -ForegroundColor Yellow
}

# Test connection
Write-Host "[4/4] Testing database connection..." -ForegroundColor Yellow
try {
    $result = psql -U postgres -d landing_builder -c "SELECT 1" 2>$null
    if ($?) {
        Write-Host "  [OK] Database connection successful" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] Could not connect to database" -ForegroundColor Yellow
        Write-Host "  Check your PostgreSQL credentials in backend/.env" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  [ERROR] Database connection failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Database Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Database configuration:" -ForegroundColor Yellow
Write-Host "  Host: localhost" -ForegroundColor White
Write-Host "  Port: 5432" -ForegroundColor White
Write-Host "  Database: landing_builder" -ForegroundColor White
Write-Host "  User: postgres" -ForegroundColor White
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host "  .\start.ps1" -ForegroundColor White
Write-Host ""
