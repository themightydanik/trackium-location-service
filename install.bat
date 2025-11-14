@echo off
echo Installing Trackium Location Service...

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js not found!
    echo Please install Node.js from: https://nodejs.org
    pause
    exit /b 1
)

echo Node.js found
node --version

echo Installing dependencies...
call npm install

echo.
echo Installation complete!
echo.
echo To start the service, run:
echo   node trackium-location.js
echo.
pause
