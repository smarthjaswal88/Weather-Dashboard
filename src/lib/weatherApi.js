import { config, validateConfig } from "./config"

export class WeatherApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = "WeatherApiError"
    this.status = status
  }
}

export const weatherApi = {
  async getCurrentWeather(city) {
    validateConfig()

    const url = `${config.openWeatherMap.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${config.openWeatherMap.apiKey}&units=metric`

    const response = await fetch(url)

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new WeatherApiError("City not found. Please check the spelling and try again.", 404)
        case 401:
          throw new WeatherApiError("API key is invalid. Please check your configuration.", 401)
        case 429:
          throw new WeatherApiError("Too many requests. Please try again later.", 429)
        default:
          throw new WeatherApiError("Failed to fetch weather data. Please try again later.", response.status)
      }
    }

    return response.json()
  },

  async getForecast(city) {
    validateConfig()

    const url = `${config.openWeatherMap.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${config.openWeatherMap.apiKey}&units=metric`

    const response = await fetch(url)

    if (!response.ok) {
      throw new WeatherApiError("Failed to fetch forecast data", response.status)
    }

    return response.json()
  },
}
