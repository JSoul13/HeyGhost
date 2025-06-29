# Paranormal App - Spirit Communicator

A React Native mobile application that simulates real-time communication with paranormal entities using device sensors, audio processing, and dynamic responses.

## Features

### Core Features
- **EMF Detection System**: Monitor device magnetometer for paranormal activity
- **EVP (Electronic Voice Phenomenon) Module**: Real-time audio recording and analysis
- **Dynamic Spirit Responses**: Pre-recorded voice library with contextual responses
- **Augmented Reality (AR) Mode**: Overlay spirit visuals on camera feed
- **Session Logging**: Save timestamps, sensor data, and audio/video clips
- **Monetization System**: Free tier with ads, Premium tier with advanced features

### Technical Features
- Cross-platform compatibility (iOS and Android)
- Modular architecture for easy updates
- Dark-themed UI with pulse animations and glitch effects
- Customizable sensitivity settings
- Real-time sensor data processing

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. For iOS:
   ```bash
   cd ios && pod install
   ```
4. Run the app:
   ```bash
   # For Android
   npm run android

   # For iOS
   npm run ios
   ```

## Project Structure

```
ParanormalApp/
├── src/
│   ├── screens/          # Main app screens
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers
│   ├── services/         # API and sensor services
│   └── utils/            # Utility functions
├── android/              # Android-specific code
├── ios/                  # iOS-specific code
└── assets/               # Images, sounds, and other assets
```

## Usage

1. **Start Session**: Begin paranormal investigation
2. **Monitor EMF**: Watch for electromagnetic field fluctuations
3. **Record EVP**: Capture potential spirit voices
4. **AR Mode**: Use camera to visualize spiritual presence
5. **Review Logs**: Analyze session data and recordings

## Premium Features

- AR Spirit Visualization
- Advanced Audio Filters
- Custom Voice Packs
- Extended Session Recording (up to 4 hours)
- Cloud Backup
- Ad-Free Experience
- Priority Support

## Development

### Adding New Features

1. Create components in `src/components/`
2. Add screens to `src/screens/`
3. Update navigation in `App.tsx`
4. Add context providers for state management

### Sensor Integration

The app uses various device sensors:
- Magnetometer for EMF detection
- Microphone for audio recording
- Camera for AR features
- Accelerometer for motion detection

## License

This project is licensed under the MIT License.