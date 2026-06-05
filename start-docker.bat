@echo off
chcp 65001 >nul
title Landing Builder - Docker Запуск

echo ========================================
echo   Landing Builder - Docker Запуск
echo ========================================
echo.

REM Проверка Docker
echo [1/3] Проверка Docker...
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo   X Docker не найден! Установите Docker Desktop
    pause
    exit /b 1
)
echo   ^V Docker установлен
echo.

REM Проверка Docker Compose
echo [2/3] Проверка Docker Compose...
where docker-compose >nul 2>nul
if %errorlevel% neq 0 (
    echo   X Docker Compose не найден!
    pause
    exit /b 1
)
echo   ^V Docker Compose установлен
echo.

REM Создание .env файлов
echo [3/3] Проверка конфигурации...

if not exist "frontend\.env" (
    echo   Создаем frontend .env...
    copy "frontend\.env.example" "frontend\.env" >nul
)

if not exist "backend\.env" (
    echo   Создаем backend .env...
    copy "backend\.env.example" "backend\.env" >nul
)

echo.
echo ========================================
echo   Запуск Docker контейнеров...
echo ========================================
echo.
echo   Frontend: http://localhost:3000
echo   Backend: http://localhost:4000
echo   API Docs: http://localhost:4000/api
echo.
echo   Для остановки: docker-compose down
echo.

docker-compose up -d

echo.
echo Контейнеры запущены!
echo Лог: docker-compose logs -f
pause
