#!/bin/bash

# 定义颜色 (可选，为了更好看)
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "LaTeX Learning Tool - One-Click Installer"
echo "=========================================="
echo

# 1. Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}[WARNING] Node.js is not installed!${NC}"
    echo "Attempting to auto-install..."
    echo

    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            echo "Homebrew detected. Installing Node.js..."
            brew install node
        else
            echo -e "${RED}[ERROR] Homebrew not found. Cannot auto-install.${NC}"
            echo "Please manually install Node.js from https://nodejs.org/"
            exit 1
        fi
    elif [ -f /etc/debian_version ]; then
        # Debian/Ubuntu
        echo "Debian/Ubuntu detected. Installing Node.js (requires sudo)..."
        # 尝试更新源并安装
        sudo apt-get update
        sudo apt-get install -y nodejs npm
    else
        echo -e "${RED}[ERROR] Unsupported OS for auto-install.${NC}"
        echo "Please manually install Node.js from https://nodejs.org/"
        exit 1
    fi

    # Verify installation
    if ! command -v node &> /dev/null; then
        echo
        echo -e "${RED}[ERROR] Auto-installation failed. Please install manually.${NC}"
        exit 1
    else
        echo
        echo -e "${GREEN}[SUCCESS] Node.js installed!${NC}"
        echo
    fi
else
    echo -e "${GREEN}[OK] Node.js found.${NC}"
    node --version
    echo
fi

# 2. Check for xelatex
if ! command -v xelatex &> /dev/null; then
    echo -e "${YELLOW}[WARNING] xelatex command not found!${NC}"
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
    echo -e "${GREEN}[OK] TeX environment (xelatex) found.${NC}"
    xelatex --version | grep -i "XeTeX" | head -n 1
    echo
fi

# 3. Install Dependencies
echo "Installing Node.js dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo
    echo "=========================================="
    echo -e "${GREEN}Installation Complete!${NC}"
    echo "You can now run the project using: npm start"
    echo "=========================================="
else
    echo
    echo -e "${RED}[ERROR] npm install failed.${NC}"
    exit 1
fi
