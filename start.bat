@echo off
echo Starting Content Hub...
start "Backend Server" cmd /k "cd /d c:\Users\santo\Desktop\vscode\link\content-hub && node server/index.js"
timeout /t 3
start "Frontend Client" cmd /k "cd /d c:\Users\santo\Desktop\vscode\link\content-hub\client && npm run dev"
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
pause
