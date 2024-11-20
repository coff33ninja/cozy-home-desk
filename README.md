# Homepage Dashboard

A customizable dashboard with weather, media services integration, and IPTV support.

## Features

- Weather widget with API integration and fallback mock data
- Media services integration (Radarr, Sonarr, Lidarr, qBittorrent)
- YouTube Music and IPTV playlist support
  - YouTube Music iframe player integration
  - M3U playlist parser for IPTV channels
  - Online radio station streaming
  - Channel guide interface
- Customizable UI with themes and layout options
- Settings management with local storage persistence

## Setup Instructions

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the following variables (optional):
   ```
   VITE_WEATHER_API_KEY=your_weather_api_key
   VITE_RADARR_API_KEY=your_radarr_api_key
   VITE_SONARR_API_KEY=your_sonarr_api_key
   VITE_LIDARR_API_KEY=your_lidarr_api_key
   ```

## Media Features

### YouTube Music
- Supports YouTube Music URLs
- Embedded player with autoplay
- Video playback in iframe

### IPTV Support
- M3U playlist parsing
- Channel guide interface
- Channel logos (when available in playlist)
- Direct stream playback

### Online Radio
- Support for direct stream URLs
- Built-in audio player
- Stream controls

## Next Steps

1. Weather Integration:
   - Add more detailed weather information
   - Improve location detection accuracy
   - Add weather alerts

2. Media Services:
   - Add more streaming services support
   - Implement playlist management
   - Add favorite channels feature

3. Performance:
   - Implement caching for API responses
   - Add loading states and error boundaries
   - Optimize component rendering

4. UI Improvements:
   - Add more theme options
   - Implement drag-and-drop widget positioning
   - Add widget size customization
   - Create mobile-responsive layouts

5. Settings:
   - Add import/export functionality
   - Implement backup/restore features
   - Add more customization options

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.