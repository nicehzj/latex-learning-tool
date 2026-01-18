@echo off
echo ==========================================
echo LaTeX Learning Tool - One-Click Installer
echo ==========================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found.
echo.

:: Check for xelatex
where xelatex >nul 2>nul
if %errorlevel% neq 0 (
    echo [WARNING] xelatex command not found!
    echo The backend requires TeX Live to compile PDF files.
    echo Please install TeX Live (https://tug.org/texlive/windows.html) or MiKTeX.
    echo You can still install dependencies, but compilation will fail.
    echo.
    pause
) else (
    echo [OK] TeX environment (xelatex) found.
    echo.
)

echo Installing Node.js dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm install failed. Please check the logs.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo Installation Complete!
echo You can now run the project using: npm start
echo ==========================================
pause
