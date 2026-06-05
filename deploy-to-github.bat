@echo off
chcp 65001 >nul
cls

echo ================================================
echo    Landing Builder - Deploy to GitHub
echo ================================================
echo.

REM Check if Git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Git not found!
    echo.
    echo Install Git: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo OK: Git found
echo.

REM Change to script directory
cd /d "%~dp0"

echo Current directory: %CD%
echo.

REM Check project structure
if not exist "frontend" (
    echo ERROR: frontend folder not found!
    echo Make sure you run this from landing-builder root
    echo.
    pause
    exit /b 1
)

if not exist "backend" (
    echo ERROR: backend folder not found!
    echo Make sure you run this from landing-builder root
    echo.
    pause
    exit /b 1
)

echo OK: Project structure checked
echo.

REM Initialize Git
echo Initializing Git...
if exist ".git" (
    echo INFO: Git already initialized
) else (
    git init
    if %errorlevel% neq 0 (
        echo ERROR: Failed to initialize Git
        pause
        exit /b 1
    )
    echo OK: Git initialized
)
echo.

REM Add files
echo Adding files...
git add .
if %errorlevel% neq 0 (
    echo WARNING: Error adding files
) else (
    echo OK: Files added
)
echo.

REM Commit
echo Creating commit...
git commit -m "Initial commit - Landing Builder SaaS"
if %errorlevel% neq 0 (
    echo INFO: No changes to commit
) else (
    echo OK: Commit created
)
echo.

REM Create main branch
echo Creating main branch...
git branch -M main
if %errorlevel% neq 0 (
    echo INFO: main branch already exists
) else (
    echo OK: main branch created
)
echo.

echo ================================================
echo    SUCCESS! Project ready for GitHub!
echo ================================================
echo.
echo NEXT STEPS:
echo.
echo 1. Create repository on GitHub:
echo    Open: https://github.com/new
echo.
echo 2. Repository name: landing-builder
echo.
echo 3. Do NOT check "Add README"
echo.
echo 4. Click "Create repository"
echo.
echo 5. Copy your repository URL
echo    Example: https://github.com/username/landing-builder.git
echo.
echo 6. Paste URL below:
echo.

set /p REPO_URL="GitHub repository URL: "

if "%REPO_URL%"=="" (
    echo.
    echo WARNING: URL not entered
    echo.
    echo Run manually:
    echo git remote add origin YOUR_URL
    echo git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo Adding remote origin...
git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    echo INFO: Remote origin already exists
    echo.
    echo Updating URL...
    git remote set-url origin %REPO_URL%
)
echo OK: Remote added
echo.

echo Pushing to GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Push failed!
    echo.
    echo Possible reasons:
    echo - Not authenticated to GitHub
    echo - Wrong repository URL
    echo - Repository does not exist
    echo.
    echo Try manually:
    echo git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ================================================
echo    SUCCESS! Project uploaded to GitHub!
echo ================================================
echo.
echo Your repository: %REPO_URL%
echo.
echo NEXT STEPS:
echo.
echo 1. Deploy Frontend to Vercel:
echo    Open: https://vercel.com/new
echo    Root Directory: frontend
echo.
echo 2. Deploy Backend to Railway:
echo    Open: https://railway.app/new
echo    Root Directory: backend
echo.
echo Full instructions: DEPLOY.md
echo.
echo ================================================
pause
