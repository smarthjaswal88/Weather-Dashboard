import { useWeather } from "../contexts/WeatherContext"
import Card from "./ui/Card"
import { Droplets, Wind, Eye, Gauge, Thermometer } from "lucide-react"

const WeatherDisplay = () => {
  const { state } = useWeather()
  const { currentWeather, temperatureUnit } = state

  if (!currentWeather) return null

  const convertTemperature = (temp) => {
    if (temperatureUnit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32)
    }
    return temp
  }

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            {currentWeather.name}, {currentWeather.country}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <img
              src={getWeatherIcon(currentWeather.icon) || "/placeholder.svg"}
              alt={currentWeather.description}
              className="w-16 h-16"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=64&width=64"
              }}
            />
            <div>
              <div className="text-4xl font-bold text-white">
                {convertTemperature(currentWeather.temperature)}°{temperatureUnit === "celsius" ? "C" : "F"}
              </div>
              <div className="text-blue-100 capitalize">{currentWeather.description}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <Thermometer className="w-6 h-6 text-blue-200 mx-auto mb-2" />
            <div className="text-sm text-blue-100">Feels like</div>
            <div className="text-white font-semibold">{convertTemperature(currentWeather.feelsLike)}°</div>
          </div>

          <div className="text-center">
            <Droplets className="w-6 h-6 text-blue-200 mx-auto mb-2" />
            <div className="text-sm text-blue-100">Humidity</div>
            <div className="text-white font-semibold">{currentWeather.humidity}%</div>
          </div>

          <div className="text-center">
            <Wind className="w-6 h-6 text-blue-200 mx-auto mb-2" />
            <div className="text-sm text-blue-100">Wind Speed</div>
            <div className="text-white font-semibold">{currentWeather.windSpeed} km/h</div>
          </div>

          <div className="text-center">
            <Gauge className="w-6 h-6 text-blue-200 mx-auto mb-2" />
            <div className="text-sm text-blue-100">Pressure</div>
            <div className="text-white font-semibold">{currentWeather.pressure} hPa</div>
          </div>

          <div className="text-center">
            <Eye className="w-6 h-6 text-blue-200 mx-auto mb-2" />
            <div className="text-sm text-blue-100">Visibility</div>
            <div className="text-white font-semibold">{currentWeather.visibility} km</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default WeatherDisplay
