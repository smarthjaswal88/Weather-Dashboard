"use client"

import { WeatherProvider } from "@/contexts/WeatherContext"
import WeatherDashboard from "@/components/WeatherDashboard"

export default function Home() {
  return (
    <WeatherProvider>
      <WeatherDashboard />
    </WeatherProvider>
  )
}
