"use client"

import { useWeather } from "@/contexts/WeatherContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForecastDisplay() {
  const { state } = useWeather()
  const { forecast, temperatureUnit } = state

  if (!forecast.length) return null

  const convertTemperature = (temp: number) => {
    if (temperatureUnit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32)
    }
    return temp
  }

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="text-center p-3 rounded-lg bg-white/5">
              <div className="text-blue-100 text-sm font-medium mb-2">{day.date}</div>
              <img
                src={getWeatherIcon(day.icon) || "/placeholder.svg"}
                alt={day.description}
                className="w-12 h-12 mx-auto mb-2"
              />
              <div className="text-white text-sm capitalize mb-2">{day.description}</div>
              <div className="text-white font-semibold">
                {convertTemperature(day.temperature.max)}° / {convertTemperature(day.temperature.min)}°
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
