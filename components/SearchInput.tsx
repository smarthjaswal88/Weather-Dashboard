"use client"

import type React from "react"

import { useState } from "react"
import { useWeather } from "@/contexts/WeatherContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchInput() {
  const [city, setCity] = useState("")
  const { fetchWeather, state } = useWeather()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      fetchWeather(city.trim())
      setCity("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-blue-100 focus:bg-white/20"
        disabled={state.loading}
      />
      <Button
        type="submit"
        disabled={state.loading || !city.trim()}
        className="bg-white/20 hover:bg-white/30 text-white border-white/20"
      >
        <Search className="w-4 h-4" />
      </Button>
    </form>
  )
}
