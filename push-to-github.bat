@echo off
REM This script pushes your content-hub to GitHub

echo.
echo ==========================================
echo   Content Hub - GitHub Upload Script
echo ==========================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed or not in PATH
    echo.
    echo Install Git from: https://git-scm.com/download/win
    echo Then restart this script.
    echo.
    pause
    exit /b 1
)

echo Git found. Proceeding...
echo.

REM Initialize git
echo [1/5] Initializing git repository...
git init
if %ERRORLEVEL% NEQ 0 goto error

echo.
echo [2/5] Adding all files...
git add .
if %ERRORLEVEL% NEQ 0 goto error

echo.
echo [3/5] Creating initial commit...
git commit -m "Initial commit - Content Hub app with SQLite, React, Express"
if %ERRORLEVEL% NEQ 0 goto error

echo.
echo [4/5] Setting main branch...
git branch -M main
if %ERRORLEVEL% NEQ 0 goto error

echo.
echo [5/5] Adding remote origin and pushing...
git remote add origin https://github.com/QWertyuiyfhbc/link.git
if %ERRORLEVEL% NEQ 0 (
    REM Remote might already exist, try to set URL
    git remote set-url origin https://github.com/QWertyuiyfhbc/link.git
)

echo.
echo Pushing to GitHub (you may need to authenticate)...
git push -u origin main

echo.
echo ==========================================
echo   ✓ Upload Complete!
echo ==========================================
echo.
echo View your repo: https://github.com/QWertyuiyfhbc/link
echo.
echo Next step: Deploy on Render.com
echo See DEPLOY_STEPS.md for instructions
echo.
pause
exit /b 0

:error
echo.
echo ERROR: Something went wrong!
echo Check the error message above.
echo.
pause
exit /b 1
