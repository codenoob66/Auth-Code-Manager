@echo off
setlocal enabledelayedexpansion

:: CONFIGURATION
set "NODE_VERSION=20.14.0"
set "NODE_URL=https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi"
set "NODE_INSTALLER=node-v%NODE_VERSION%.msi"

:: STEP 1: Download Node.js
echo === Downloading Node.js %NODE_VERSION% ===
powershell -Command "Invoke-WebRequest -Uri '!NODE_URL!' -OutFile '!NODE_INSTALLER!'"
if not exist "!NODE_INSTALLER!" (
    echo Failed to download Node.js installer.
    exit /b 1
)

:: STEP 2: Install Node.js Silently
echo === Installing Node.js silently ===
msiexec /i "!NODE_INSTALLER!" /quiet /norestart

:: STEP 3: Manually update PATH for current session
:: Assumes default installation path
set "NODE_PATH=C:\Program Files\nodejs"
set "PATH=%NODE_PATH%;%PATH%"

:: STEP 5: Install Puppeteer Globally
echo === Installing Puppeteer globally ===
npm install -g puppeteer

echo === Node.js and npm installed successfully ===
pause
