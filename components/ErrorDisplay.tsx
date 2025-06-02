"use client"

import { useWeather } from "@/contexts/WeatherContext"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, X } from "lucide-react"

export default function ErrorDisplay() {
  const { state, dispatch } = useWeather()

  if (!state.error) return null

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  return (
    <Alert className="bg-red-500/10 border-red-500/20 mb-6">
      <AlertCircle className="h-4 w-4 text-red-400" />
      <AlertDescription className="text-red-100 flex items-center justify-between">
        <span>{state.error}</span>
        <Button
          onClick={clearError}
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1 h-auto"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
