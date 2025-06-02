"use client"

import { useEffect } from "react"
import { useWeather } from "@/contexts/WeatherContext"
import SearchInput from "./SearchInput"
import WeatherDisplay from "./WeatherDisplay"
import ErrorDisplay from "./ErrorDisplay"
import ForecastDisplay from "./ForecastDisplay"
import { Button } from "@/components/ui/button"
import { Thermometer } from "lucide-react"
import WeatherSkeleton from "./WeatherSkeleton"
import QuickStartGuide from "./QuickStartGuide"

export default function WeatherDashboard() {
  const { state, dispatch, fetchWeather } = useWeather()

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (state.lastSearchedCity) {
      const interval = setInterval(() => {
        fetchWeather(state.lastSearchedCity)
      }, 30000) // 30 seconds

      return () => clearInterval(interval)
    }
  }, [state.lastSearchedCity, fetchWeather])

  const toggleTemperatureUnit = () => {
    dispatch({ type: "TOGGLE_TEMPERATURE_UNIT" })
  }

  return (
<div style={{ backgroundColor: "#1b094f;", height: "100vh" }}>
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-blue-100">Get real-time weather information for any city</p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <SearchInput />
          <Button
            onClick={toggleTemperatureUnit}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Thermometer className="w-4 h-4 mr-2" />°{state.temperatureUnit === "celsius" ? "C" : "F"}
          </Button>
        </div>

        {/* Error Display */}
        {state.error && <ErrorDisplay />}

        {/* Weather Display */}
        {state.currentWeather && !state.error && (
          <div className="space-y-6">
            <WeatherDisplay />
            <ForecastDisplay />
          </div>
        )}

        {/* Loading State */}
        {state.loading && <WeatherSkeleton />}

        {/* Initial State */}
        {!state.currentWeather && !state.loading && !state.error && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <p className="text-blue-100 text-lg mb-2">Search for a city to get started</p>
              <p className="text-blue-200 text-sm">Get real-time weather data and 5-day forecasts</p>
            </div>
            <QuickStartGuide />
          </div>
        )}
      </div>
    </div>
  </div>
  )
}
