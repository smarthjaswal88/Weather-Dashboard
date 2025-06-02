export const config = {
  openWeatherMap: {
    apiKey: "a85f901403aa1cd1ca1c8b397eaa110d",
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
      "OpenWeatherMap API key is missing. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables.",
    )
  }
}
