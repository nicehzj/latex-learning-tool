#!/bin/bash

echo "=========================================="
echo "LaTeX Learning Tool - One-Click Installer"
echo "=========================================="
echo

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please download and install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[OK] Node.js found."
echo

# Check for xelatex
if ! command -v xelatex &> /dev/null; then
    echo "[WARNING] xelatex command not found!"
    echo "The backend requires MacTeX (macOS) or TeX Live (Linux) to compile PDF files."
    echo "Please install it manually."
    echo
else
    echo "[OK] TeX environment (xelatex) found."
    echo
fi

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
