# Google Maps with Next.js

A modern Google Maps integration built with Next.js, featuring location search, custom markers, and interactive map functionality.

## Features

- Interactive Google Maps integration
- Location search with autocomplete
- Custom markers and info windows
- Responsive design
- Fast performance with Next.js
- Easy navigation and user-friendly interface

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ahmedabdo459/Google-Maps-nextjs.git
   cd Google-Maps-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. **Get Google Maps API Key**
   - Visit Google Cloud Console
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
     - Geocoding API
   - Create credentials (API key)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to http://localhost:3000

## Built With

- **Framework**: Next.js
- **Maps**: Google Maps JavaScript API
- **Styling**: CSS Modules/Tailwind CSS
- **Deployment**: Vercel (recommended)

## Project Structure

```
google-maps-nextjs/
├── components/
│   ├── Map/
│   ├── Search/
│   └── UI/
├── pages/
│   ├── api/
│   ├── index.js
│   └── _app.js
├── styles/
├── public/
└── utils/
```

## Usage

1. **Search for locations** using the search bar
2. **Click on markers** to view location details
3. **Drag and zoom** the map for navigation
4. **Customize markers** and info windows as needed

## Configuration

### Customizing Map Options

Edit the map configuration in `components/Map/Map.js`:

```javascript
const mapOptions = {
  zoom: 12,
  center: { lat: 30.0444, lng: 31.2357 }, // Default Cairo, Egypt
  styles: [...], // Custom map styles
  disableDefaultUI: false,
  zoomControl: true
}
```

## Deployment

### Deploy on Vercel

```bash
npm run build
# Deploy to Vercel
vercel --prod
```

### Environment Variables for Production

Make sure to set your environment variables in your deployment platform:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Important Notes

- Keep your API keys secure and never commit them to version control
- Be aware of Google Maps API usage limits and pricing
- Ensure proper CORS configuration for production deployment

## Troubleshooting

### Common Issues

1. **Map not loading**: Check your API key and ensure required APIs are enabled
2. **Search not working**: Verify Places API is enabled
3. **Build errors**: Ensure all environment variables are set

### Support

For support and questions, please open an issue on GitHub.

---

**Developed by Ahmed Abdo**
