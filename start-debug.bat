@echo off
chcp 65001 >nul
title Landing Builder - Запуск с диагностикой

echo ========================================
echo   Landing Builder - Запуск с диагностикой
echo ========================================
echo.

REM Проверка Node.js
echo [CHECK] Проверка Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js не найден!
    echo Установите Node.js с https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js: %NODE_VERSION%

REM Проверка npm
echo [CHECK] Проверка npm...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm не найден!
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm: %NPM_VERSION%
echo.

REM Проверка директорий
echo [CHECK] Проверка структуры проекта...
if not exist "frontend" (
    echo [ERROR] Директория frontend не найдена!
    pause
    exit /b 1
)
if not exist "backend" (
    echo [ERROR] Директория backend не найдена!
    pause
    exit /b 1
)
echo [OK] Структура проекта корректна
echo.

REM Установка root зависимостей
echo [INSTALL] Установка root зависимостей...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Не удалось установить root зависимости!
    pause
    exit /b 1
)
echo [OK] Root зависимости установлены
echo.

REM Установка frontend зависимостей
echo [INSTALL] Установка frontend зависимостей...
if not exist "frontend\node_modules" (
    cd frontend
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Не удалось установить frontend зависимости!
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Frontend зависимости установлены
) else (
    echo [OK] Frontend зависимости уже установлены
)
echo.

REM Установка backend зависимостей
echo [INSTALL] Установка backend зависимостей...
if not exist "backend\node_modules" (
    cd backend
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Не удалось установить backend зависимости!
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Backend зависимости установлены
) else (
    echo [OK] Backend зависимости уже установлены
)
echo.

REM Создание .env файлов
echo [CONFIG] Проверка конфигурации...
if not exist "frontend\.env" (
    echo [INFO] Создаем frontend .env...
    copy "frontend\.env.example" "frontend\.env" >nul
    echo [OK] frontend .env создан
) else (
    echo [OK] frontend .env существует
)

if not exist "backend\.env" (
    echo [INFO] Создаем backend .env...
    copy "backend\.env.example" "backend\.env" >nul
    echo [OK] backend .env создан
) else (
    echo [OK] backend .env существует
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
echo ========================================
echo.

REM Запуск разработки
call npm run dev

pause
