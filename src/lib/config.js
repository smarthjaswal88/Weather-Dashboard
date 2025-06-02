export const config = {
  openWeatherMap: {
    apiKey: import.meta.env.VITE_OPENWEATHER_API_KEY,
    baseUrl: "https://api.openweathermap.org/data/2.5",
  },
  app: {
    refreshInterval: 30000, // 30 seconds
    defaultCity: "London",
  },
}

export const validateConfig = () => {
  if (!config.openWeatherMap.apiKey) {
    throw new Error(
      "OpenWeatherMap API key is missing. Please add VITE_OPENWEATHER_API_KEY to your environment variables.",
    )
  }
}
