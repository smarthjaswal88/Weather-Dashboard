import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Thermometer, RefreshCw } from "lucide-react"

export default function QuickStartGuide() {
  const features = [
    {
      icon: Search,
      title: "Search Any City",
      description: "Enter any city name to get current weather data",
    },
    {
      icon: MapPin,
      title: "Auto-Save Location",
      description: "Your last searched city is automatically saved",
    },
    {
      icon: Thermometer,
      title: "Toggle Units",
      description: "Switch between Celsius and Fahrenheit",
    },
    {
      icon: RefreshCw,
      title: "Auto-Refresh",
      description: "Weather data updates every 30 seconds",
    },
  ]

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-center">How to Use</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
              <feature.icon className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium text-sm">{feature.title}</h3>
                <p className="text-blue-100 text-xs mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
