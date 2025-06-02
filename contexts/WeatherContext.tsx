"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { weatherApi, WeatherApiError } from "@/lib/weatherApi"

interface WeatherData {
  name: string
  country: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
  feelsLike: number
  pressure: number
  visibility: number
}

interface ForecastData {
  date: string
  temperature: {
    min: number
    max: number
  }
  description: string
  icon: string
}

interface WeatherState {
  currentWeather: WeatherData | null
  forecast: ForecastData[]
  loading: boolean
  error: string | null
  lastSearchedCity: string
  temperatureUnit: "celsius" | "fahrenheit"
}

type WeatherAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_WEATHER"; payload: WeatherData }
  | { type: "SET_FORECAST"; payload: ForecastData[] }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LAST_SEARCHED_CITY"; payload: string }
  | { type: "TOGGLE_TEMPERATURE_UNIT" }

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
  lastSearchedCity: "",
  temperatureUnit: "celsius",
}

const weatherReducer = (state: WeatherState, action: WeatherAction): WeatherState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_WEATHER":
      return { ...state, currentWeather: action.payload, loading: false, error: null }
    case "SET_FORECAST":
      return { ...state, forecast: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    case "SET_LAST_SEARCHED_CITY":
      return { ...state, lastSearchedCity: action.payload }
    case "TOGGLE_TEMPERATURE_UNIT":
      return {
        ...state,
        temperatureUnit: state.temperatureUnit === "celsius" ? "fahrenheit" : "celsius",
      }
    default:
      return state
  }
}

interface WeatherContextType {
  state: WeatherState
  dispatch: React.Dispatch<WeatherAction>
  fetchWeather: (city: string) => Promise<void>
  fetchForecast: (city: string) => Promise<void>
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState)

  // Load last searched city from localStorage on mount
  useEffect(() => {
    const savedCity = localStorage.getItem("lastSearchedCity")
    const savedUnit = localStorage.getItem("temperatureUnit") as "celsius" | "fahrenheit"

    if (savedCity) {
      dispatch({ type: "SET_LAST_SEARCHED_CITY", payload: savedCity })
      fetchWeather(savedCity)
    }

    if (savedUnit) {
      dispatch({ type: "TOGGLE_TEMPERATURE_UNIT" })
    }
  }, [])

  // Save to localStorage when city or unit changes
  useEffect(() => {
    if (state.lastSearchedCity) {
      localStorage.setItem("lastSearchedCity", state.lastSearchedCity)
    }
    localStorage.setItem("temperatureUnit", state.temperatureUnit)
  }, [state.lastSearchedCity, state.temperatureUnit])

  const fetchWeather = async (city: string) => {
    if (!city.trim()) return

    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "CLEAR_ERROR" })

    try {
      const data = await weatherApi.getCurrentWeather(city)

      const weatherData: WeatherData = {
        name: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        icon: data.weather[0].icon,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: Math.round(data.visibility / 1000), // Convert to km
      }

      dispatch({ type: "SET_WEATHER", payload: weatherData })
      dispatch({ type: "SET_LAST_SEARCHED_CITY", payload: city })

      // Fetch forecast data
      await fetchForecast(city)
    } catch (error) {
      const errorMessage = error instanceof WeatherApiError ? error.message : "An unexpected error occurred"

      dispatch({ type: "SET_ERROR", payload: errorMessage })
    }
  }

  const fetchForecast = async (city: string) => {
    try {
      const data = await weatherApi.getForecast(city)

      // Process forecast data - get one forecast per day for next 5 days
      const dailyForecasts: ForecastData[] = []
      const processedDates = new Set()

      data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toDateString()

        if (!processedDates.has(date) && dailyForecasts.length < 5) {
          processedDates.add(date)
          dailyForecasts.push({
            date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            }),
            temperature: {
              min: Math.round(item.main.temp_min),
              max: Math.round(item.main.temp_max),
            },
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          })
        }
      })

      dispatch({ type: "SET_FORECAST", payload: dailyForecasts })
    } catch (error) {
      console.error("Failed to fetch forecast:", error)
    }
  }

  return (
    <WeatherContext.Provider value={{ state, dispatch, fetchWeather, fetchForecast }}>
      {children}
    </WeatherContext.Provider>
  )
}
