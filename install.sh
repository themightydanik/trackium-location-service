#!/bin/bash

echo "📍 Installing Trackium Location Service..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found!"
    echo "Please install Node.js from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install dependencies (none needed currently)
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "To start the service, run:"
echo "  node trackium-location.js"
echo ""
echo "Or install globally:"
echo "  npm install -g ."
echo "  trackium-location"
