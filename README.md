# Homepage Dashboard

A customizable dashboard with weather, media services integration, and IPTV support.

## Features

- Weather widget with API integration and fallback mock data
- Media services integration (Radarr, Sonarr, Lidarr, qBittorrent)
- YouTube Music and IPTV playlist support
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

## Next Steps

1. Weather Integration:
   - Implement weather API service with OpenWeatherMap or similar
   - Add location detection or manual location input
   - Create weather forecast view

2. Media Services:
   - Complete Radarr/Sonarr/Lidarr API integration
   - Add download status monitoring
   - Implement search functionality

3. Music and IPTV:
   - Integrate YouTube Music iframe player
   - Add M3U playlist parser for IPTV
   - Create channel guide interface
   - Add online radio station support

4. UI Improvements:
   - Add more theme options
   - Implement drag-and-drop widget positioning
   - Add widget size customization
   - Create mobile-responsive layouts

5. Performance:
   - Implement caching for API responses
   - Add loading states and error boundaries
   - Optimize component rendering

6. Settings:
   - Add import/export functionality
   - Implement backup/restore features
   - Add more customization options

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.