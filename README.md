# React.js Weather Dashboard

A comprehensive weather dashboard built with **React.js** using **JavaScript and JSX** that fetches real-time weather data and provides a beautiful, responsive interface for viewing current weather conditions and 5-day forecasts.

## 🌟 Features

### Core Features

- **Real-time Weather Data**: Get current weather information for any city worldwide
- **Search Functionality**: Easy-to-use search input with error handling
- **Auto-refresh**: Weather data updates automatically every 30 seconds
- **Local Storage**: Remembers your last searched city and temperature preference
- **Error Handling**: Graceful error handling with user-friendly messages
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Bonus Features

- **5-Day Forecast**: Extended weather forecast with daily highs and lows
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **Weather Icons**: Visual weather icons from OpenWeatherMap
- **Modern UI**: Beautiful gradient background with glassmorphism effects

## 🛠️ Technology Stack

- **React 18** with functional components and hooks
- **JavaScript (ES6+)** with JSX syntax
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Context API** for state management
- **OpenWeatherMap API** for weather data
- **Lucide React** for icons

## 📦 Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd react-weather-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   \`\`\`env
   VITE_OPENWEATHER_API_KEY= YOUR_API_KEY

   \`\`\`

   Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

\`\`\`
src/
├── components/
│ ├── ui/ # Reusable UI components
│ │ ├── Button.jsx
│ │ ├── Input.jsx
│ │ ├── Card.jsx
│ │ └── Alert.jsx
│ ├── ErrorDisplay.jsx
│ ├── ForecastDisplay.jsx
│ ├── QuickStartGuide.jsx
│ ├── SearchInput.jsx
│ ├── WeatherDashboard.jsx
│ ├── WeatherDisplay.jsx
│ └── WeatherSkeleton.jsx
├── contexts/
│ └── WeatherContext.jsx # Global state management
├── lib/
│ ├── config.js # Configuration and environment
│ └── weatherApi.js # API service layer
├── App.jsx # Main App component
├── main.jsx # React entry point
├── index.css # Global styles
└── App.css # App-specific styles
\`\`\`

## 🎯 Key Implementation Details

### State Management

- Uses **React Context API** for global state management
- Implements **useReducer** for complex state logic
- Manages loading states, error states, and weather data

### API Integration

- Fetches data from **OpenWeatherMap API**
- Implements proper error handling for different HTTP status codes
- Uses **Vite environment variables** for API key security
- Includes automatic polling every 30 seconds

### Local Storage

- Persists last searched city
- Saves temperature unit preference
- Automatically loads saved data on app startup

### Error Handling

- Network error handling
- Invalid city name handling
- API key validation
- User-friendly error messages

### Component Architecture

- **Functional components** with React hooks
- **JavaScript with JSX** syntax
- **Modular component structure**
- **Separation of concerns**
- **Reusable UI components**

## 🚀 Usage

1. **Search for a city**: Enter any city name in the search input
2. **View current weather**: See temperature, humidity, wind speed, and more
3. **Check forecast**: View the 5-day weather forecast
4. **Toggle units**: Switch between Celsius and Fahrenheit
5. **Auto-refresh**: Weather data updates automatically every 30 seconds

## 🎨 Design Features

- **Glassmorphism UI**: Modern glass-like effects with backdrop blur
- **Gradient Background**: Beautiful blue gradient background
- **Responsive Grid**: Adapts to different screen sizes
- **Weather Icons**: Official OpenWeatherMap weather icons
- **Loading States**: Smooth loading animations with skeleton screens
- **Error States**: Clear error messaging with dismiss functionality

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers (1024px+)
- Tablets (768px - 1023px)
- Mobile phones (320px - 767px)

## 🔧 Environment Variables

| Variable                   | Description                 | Required |
| -------------------------- | --------------------------- | -------- |
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes      |

## 🧪 React Hooks Used

- **useState**: For local component state
- **useEffect**: For side effects and lifecycle management
- **useContext**: For consuming global state
- **useReducer**: For complex state management
- **Custom Hooks**: useWeather for weather-specific logic

## 📋 React Best Practices Implemented

- ✅ Functional components with hooks
- ✅ JavaScript with JSX syntax
- ✅ Proper component composition
- ✅ Context API for state management
- ✅ Custom hooks for reusable logic
- ✅ Error boundaries and error handling
- ✅ Performance optimization with useCallback
- ✅ Accessibility features
- ✅ Responsive design
- ✅ Clean code structure

## 🚀 Build & Deployment

### Build for production

\`\`\`bash
npm run build
\`\`\`

### Preview production build

\`\`\`bash
npm run preview
\`\`\`

### Deploy to Vercel

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## 🧪 Testing

The application includes comprehensive error handling and edge case management:

- Invalid city names
- Network failures
- API rate limiting
- Missing API keys
- Empty search queries

## 📄 License

This project is created as part of a technical assignment for Qodex.ai.

## 👨‍💻 Developer

Created as part of the Frontend Developer Assignment for Qodex.ai

---

**Note**: This application requires a valid OpenWeatherMap API key to function properly. The API key should be added to your environment variables before running the application.

## 🔄 Assignment Requirements Met

✅ **Project Setup**: Built with Vite and React.js  
✅ **Functional Components**: All components use React hooks  
✅ **JavaScript & JSX**: Pure JavaScript with JSX syntax  
✅ **Styling**: Tailwind CSS with custom UI components  
✅ **Search Functionality**: Dedicated SearchInput component  
✅ **Weather Display**: Complete weather information display  
✅ **API Integration**: OpenWeatherMap API with polling  
✅ **Error Handling**: Comprehensive error management  
✅ **Local Storage**: Persistent user preferences  
✅ **Component Structure**: Modular, reusable components  
✅ **State Management**: React Context API with useReducer  
✅ **Bonus Features**: 5-day forecast, unit conversion, modern UI

## 🎯 React.js Specific Features

- **Pure React.js**: No framework dependencies
- **JavaScript with JSX**: No TypeScript, pure JS
- **Vite**: Fast development and build tool
- **Modern Hooks**: useState, useEffect, useContext, useReducer
- **Context API**: Global state management
- **Custom Hooks**: Reusable logic extraction
- **Component Composition**: Clean, modular architecture
