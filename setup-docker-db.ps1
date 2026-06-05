# Setup PostgreSQL with Docker
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup PostgreSQL with Docker" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "[1/3] Checking Docker..." -ForegroundColor Yellow
try {
    $dockerInfo = docker info 2>$null
    if ($?) {
        Write-Host "  [OK] Docker is running" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] Docker is not running!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please start Docker Desktop and try again." -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "  [ERROR] Docker not found or not running!" -ForegroundColor Red
    Write-Host "Please install and start Docker Desktop: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}

# Check if PostgreSQL container exists
Write-Host "[2/3] Checking PostgreSQL container..." -ForegroundColor Yellow
$containerExists = docker ps -a --filter "name=landing-postgres" --format "{{.Names}}"
if ($containerExists) {
    Write-Host "  [OK] PostgreSQL container exists" -ForegroundColor Green
    # Start if stopped
    $containerRunning = docker ps --filter "name=landing-postgres" --format "{{.Names}}"
    if (-not $containerRunning) {
        Write-Host "  Starting PostgreSQL container..." -ForegroundColor Cyan
        docker start landing-postgres 2>$null
        Write-Host "  [OK] Container started" -ForegroundColor Green
    }
} else {
    Write-Host "  Creating PostgreSQL container..." -ForegroundColor Cyan
    docker run -d `
        --name landing-postgres `
        -p 5432:5432 `
        -e POSTGRES_USER=postgres `
        -e POSTGRES_PASSWORD=postgres `
        -e POSTGRES_DB=landing_builder `
        -v postgres_data:/var/lib/postgresql/data `
        postgres:15-alpine 2>$null
    
    if ($?) {
        Write-Host "  [OK] PostgreSQL container created" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] Failed to create container" -ForegroundColor Red
        exit 1
    }
}

# Wait for PostgreSQL to be ready
Write-Host "[3/3] Waiting for PostgreSQL to be ready..." -ForegroundColor Yellow
for ($i = 1; $i -le 30; $i++) {
    Start-Sleep -Seconds 2
    try {
        $result = docker exec landing-postgres psql -U postgres -c "SELECT 1" 2>$null
        if ($?) {
            Write-Host "  [OK] PostgreSQL is ready!" -ForegroundColor Green
            break
        }
    } catch {
        if ($i -eq 30) {
            Write-Host "  [ERROR] PostgreSQL failed to start" -ForegroundColor Red
            exit 1
        }
        Write-Host "  Waiting... ($i/30)" -ForegroundColor Cyan
    }
}

# Create database if not exists
Write-Host ""
Write-Host "Creating database..." -ForegroundColor Yellow
docker exec landing-postgres psql -U postgres -c "CREATE DATABASE landing_builder;" 2>$null
if ($?) {
    Write-Host "  [OK] Database ready" -ForegroundColor Green
} else {
    Write-Host "  [INFO] Database may already exist" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PostgreSQL Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Database configuration:" -ForegroundColor Yellow
Write-Host "  Host: localhost" -ForegroundColor White
Write-Host "  Port: 5432" -ForegroundColor White
Write-Host "  Database: landing_builder" -ForegroundColor White
Write-Host "  User: postgres" -ForegroundColor White
Write-Host "  Password: postgres" -ForegroundColor White
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host "  .\start.ps1" -ForegroundColor White
Write-Host ""
Write-Host "To stop PostgreSQL:" -ForegroundColor Yellow
Write-Host "  docker stop landing-postgres" -ForegroundColor White
Write-Host ""
Write-Host "To start PostgreSQL:" -ForegroundColor Yellow
Write-Host "  docker start landing-postgres" -ForegroundColor White
Write-Host ""
