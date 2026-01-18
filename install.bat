@echo off
setlocal
echo ==========================================
echo LaTeX Learning Tool - One-Click Installer
echo ==========================================
echo.

:: 1. Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [WARNING] Node.js is not installed!
    echo.
    echo Attempting to install Node.js LTS via Windows Package Manager (winget)...
    
    where winget >nul 2>nul
    if %errorlevel% neq 0 (
        echo [ERROR] 'winget' command not found. Cannot auto-install.
        echo Please manually install Node.js from: https://nodejs.org/
        pause
        exit /b 1
    )

    :: Install Node.js
    winget install -e --id OpenJS.NodeJS.LTS
    
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Auto-installation failed.
        echo Please manually install Node.js from: https://nodejs.org/
        pause
        exit /b 1
    )

    echo.
    echo [SUCCESS] Node.js installed successfully!
    echo ========================================================
    echo IMPORTANT: You MUST restart this script (close and reopen)
    echo for the new environment variables to take effect.
    echo ========================================================
    pause
    exit /b 0
)

echo [OK] Node.js found.
node --version
echo.

:: 2. Check for xelatex
where xelatex >nul 2>nul
if %errorlevel% neq 0 (
    echo [WARNING] xelatex command not found!
    echo The backend requires TeX Live to compile PDF files.
    echo.
    echo Please install TeX Live manually: https://tug.org/texlive/windows.html
    echo (Auto-installation of TeX Live is too large/complex for this script)
    echo.
    echo You can still proceed to install dependencies, but compilation will fail.
    echo.
    pause
) else (
    echo [OK] TeX environment (xelatex) found.
    xelatex --version | findstr /b "XeTeX"
    echo.
)

:: 3. Install Dependencies
echo Installing project dependencies...
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