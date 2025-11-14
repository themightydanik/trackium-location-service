# 📍 Trackium Location Service

Lightweight Node.js service for tracking device location using WiFi/Cell/IP geolocation APIs.

## Features

- ✅ Works without GPS
- ✅ WiFi and Cell tower triangulation
- ✅ IP-based fallback
- ✅ Minimal battery usage
- ✅ Cross-platform (Mac, Windows, Linux)

## Installation

### Requirements

- Node.js 16+ ([download](https://nodejs.org))
- Trackium MiniDapp running on Minima node

### Quick Install

1. Download and extract this folder
2. Open terminal/command prompt in this folder
3. Run:
```bash
npm install
node trackium-location.js
```

### Global Install (Optional)
```bash
npm install -g .
trackium-location
```

## Configuration

On first run, you'll be asked for:
- **Device ID** - from your Trackium MiniDapp
- **Minima Node URL** - default: `http://127.0.0.1:9003`

Or set environment variables:
```bash
export TRACKIUM_DEVICE_ID="TRACK-XXX-YYY"
export MINIMA_NODE_URL="http://127.0.0.1:9003"
export UPDATE_INTERVAL=180000
```

## Usage

### Start Service
```bash
node trackium-location.js
```

### Custom Configuration
```bash
TRACKIUM_DEVICE_ID=TRACK-ABC-123 node trackium-location.js
```

### Check Status

The service will display:
- Current location coordinates
- Accuracy (in meters)
- Data source (BigDataCloud/IP-API/Mozilla)
- Upload status to MiniDapp

## How It Works

1. **WiFi/Cell Location**: Uses BigDataCloud API for accurate positioning
2. **IP Fallback**: Falls back to IP-API.com if WiFi data unavailable
3. **Local Storage**: Saves location data to `location-data.json`
4. **Auto Upload**: Sends location to Minima MiniDapp every 3 minutes

## Troubleshooting

### Location not detected?

- Make sure you're connected to WiFi
- Try moving closer to a window (better signal)
- Check your internet connection

### Cannot connect to MiniDapp?

- Verify Minima node is running
- Check node URL: `http://127.0.0.1:9003`
- Ensure MiniDapp is installed and active

### Node.js not found?

Download and install from: https://nodejs.org

## Data Privacy

- Location data is sent only to your local Minima node
- No third-party tracking
- No cloud storage
- All data stays on your device

## Support

Issues: https://github.com/trackium/issues
Docs: https://docs.trackium.tech
