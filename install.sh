#!/bin/bash

echo "=========================================="
echo "LaTeX Learning Tool - One-Click Installer"
echo "=========================================="
echo

# 1. Check for Node.js
if ! command -v node &> /dev/null; then
    echo "[WARNING] Node.js is not installed!"
    echo "Attempting to auto-install..."
    echo

    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            echo "Homebrew detected. Installing Node.js..."
            brew install node
        else
            echo "[ERROR] Homebrew not found. Cannot auto-install."
            echo "Please manually install Node.js from https://nodejs.org/"
            exit 1
        fi
    elif [ -f /etc/debian_version ]; then
        # Debian/Ubuntu
        echo "Debian/Ubuntu detected. Installing Node.js (requires sudo)..."
        # Using default repo nodejs might be old, but it's safest for a simple script
        sudo apt-get update
        sudo apt-get install -y nodejs npm
    else
        echo "[ERROR] Unsupported OS for auto-install."
        echo "Please manually install Node.js from https://nodejs.org/"
        exit 1
    fi

    # Verify installation
    if ! command -v node &> /dev/null; then
        echo
        echo "[ERROR] Auto-installation failed. Please install manually."
        exit 1
    else
        echo
        echo "[SUCCESS] Node.js installed!"
        echo
    fi
else
    echo "[OK] Node.js found."
    node --version
    echo
fi

# 2. Check for xelatex
if ! command -v xelatex &> /dev/null; then
    echo "[WARNING] xelatex command not found!"
    echo "The backend requires a TeX distribution to compile PDF files."
    echo
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "Recommended: Install MacTeX via 'brew install --cask mactex'"
    else
        echo "Recommended: Install TeX Live (e.g., 'sudo apt install texlive-xetex')"
    fi
    echo "You can still run the app, but compilation will fail."
    echo
else
    echo "[OK] TeX environment (xelatex) found."
    xelatex --version | grep -i "XeTeX" | head -n 1
    echo
fi

# 3. Install Dependencies
echo "Installing Node.js dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo
    echo "=========================================="
    echo "Installation Complete!"
    echo "You can now run the project using: npm start"
    echo "=========================================="
else
    echo
    echo "[ERROR] npm install failed."
    exit 1
fi