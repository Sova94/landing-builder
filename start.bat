@echo off
chcp 65001 >nul
title Landing Builder - Запуск проекта

echo ========================================
echo   Landing Builder - Запуск проекта
echo ========================================
echo.

REM Проверка Node.js
echo [1/6] Проверка Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo   X Node.js не найден! Установите Node.js 18+
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo   ^V Node.js: %NODE_VERSION%

REM Проверка npm
echo [2/6] Проверка npm...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo   X npm не найден!
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo   ^V npm: %NPM_VERSION%
echo.

REM Установка зависимостей frontend
echo [3/6] Установка зависимостей frontend...
if not exist "frontend\node_modules" (
    echo   Устанавливаем frontend зависимости...
    cd frontend
    call npm install
    cd ..
) else (
    echo   ^V Frontend зависимости уже установлены
)

REM Установка зависимостей backend
echo [4/6] Установка зависимостей backend...
if not exist "backend\node_modules" (
    echo   Устанавливаем backend зависимости...
    cd backend
    call npm install
    cd ..
) else (
    echo   ^V Backend зависимости уже установлены
)

REM Создание .env файлов
echo [5/6] Проверка конфигурации...

if not exist "frontend\.env" (
    echo   Создаем frontend .env...
    copy "frontend\.env.example" "frontend\.env" >nul
) else (
    echo   ^V frontend .env существует
)

if not exist "backend\.env" (
    echo   Создаем backend .env...
    copy "backend\.env.example" "backend\.env" >nul
) else (
    echo   ^V backend .env существует
)

echo.
echo ========================================
echo   Запуск сервисов...
echo ========================================
echo.
echo   Backend: http://localhost:4000
echo   Frontend: http://localhost:3000
echo   API Docs: http://localhost:4000/api
echo.
echo   Нажмите Ctrl+C для остановки серверов
echo.

REM Запуск разработки
cd ..
call npm run dev
