@echo off
setlocal enabledelayedexpansion

REM CloudFlex IT Local Development Server Startup Script (Windows)
REM This batch file starts the local development server with proper configuration

color 0B
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    CloudFlex IT Solutions                    ║
echo ║                  Local Development Server                    ║
echo ║                      Starting...                            ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Load configuration from .local file
set LOCAL_PORT=8000
set LOCAL_HOST=localhost

if exist ".local" (
    echo [✓] Loading configuration from .local file...
    for /f "tokens=1,2 delims==" %%a in (.local) do (
        if "%%a"=="LOCAL_PORT" set LOCAL_PORT=%%b
        if "%%a"=="LOCAL_HOST" set LOCAL_HOST=%%b
    )
) else (
    echo [⚠] .local file not found, using default settings
)

echo [🔍] Checking if port %LOCAL_PORT% is available...

REM Check if port is in use
netstat -an | find ":%LOCAL_PORT%" | find "LISTENING" >nul
if %errorlevel% == 0 (
    echo [❌] Port %LOCAL_PORT% is already in use!
    echo [💡] Try using a different port or stop the existing service
    pause
    exit /b 1
) else (
    echo [✓] Port %LOCAL_PORT% is available
)

REM Create necessary directories
echo [📁] Setting up directories...
if not exist "uploads\resumes" mkdir uploads\resumes
if not exist "logs" mkdir logs
if not exist "backups" mkdir backups

REM Check for Python
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [✓] Using Node.js for development server
) else (
    echo [❌] Node.js is not installed or not in PATH
    echo [💡] Please install Node.js to run the development server
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo [📦] Installing dependencies...
    npm install
)

REM Display server information
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    SERVER INFORMATION                        ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║  🌐 Local URL: http://%LOCAL_HOST%:%LOCAL_PORT%                           ║
echo ║  🚀 AI Assistant: Enabled                                   ║
echo ║  🎨 Glassmorphism UI: Active                                ║
echo ║  🎙️ Voice Recognition: Available                            ║
echo ║  📱 Mobile Responsive: Yes                                  ║
echo ║  🔧 Development Mode: On                                    ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Log startup time
echo %date% %time%: Starting CloudFlex IT local server on port %LOCAL_PORT% >> logs\startup.log

echo [🚀] Starting CloudFlex IT development server...
echo [🔧] Using Node.js instead of Python for better compatibility...
echo [💡] Press Ctrl+C to stop the server
echo [🔗] Open http://%LOCAL_HOST%:%LOCAL_PORT% in your browser
echo.

REM Features to test
color 0D
echo [📋] Features to test:
echo    • Click the AI assistant brain icon (bottom-right)
echo    • Test voice input with the microphone button
echo    • Try capability cards (Immigration, Jobs, Consulting)
echo    • Test suggestion chips and quick actions
echo    • Check mobile responsiveness
echo.

color 0B
echo [🎯] Server starting on http://%LOCAL_HOST%:%LOCAL_PORT%
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Start the Node.js server
npm start

REM If we reach here, the server has stopped
echo.
echo [🛑] CloudFlex IT development server stopped
echo %date% %time%: Server stopped >> logs\startup.log
pause