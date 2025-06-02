import { config, validateConfig } from "./config"

export interface WeatherApiResponse {
  name: string
  sys: { country: string }
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
  wind: { speed: number }
  visibility: number
}

export interface ForecastApiResponse {
  list: Array<{
    dt: number
    main: {
      temp_min: number
      temp_max: number
    }
    weather: Array<{
      description: string
      icon: string
    }>
  }>
}

export class WeatherApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = "WeatherApiError"
  }
}

export const weatherApi = {
  async getCurrentWeather(city: string): Promise<WeatherApiResponse> {
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

  async getForecast(city: string): Promise<ForecastApiResponse> {
    validateConfig()

    const url = `${config.openWeatherMap.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${config.openWeatherMap.apiKey}&units=metric`

    const response = await fetch(url)

    if (!response.ok) {
      throw new WeatherApiError("Failed to fetch forecast data", response.status)
    }

    return response.json()
  },
}
