import { Card, CardContent } from "@/components/ui/card"

export default function WeatherSkeleton() {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="h-8 bg-white/20 rounded-md w-48 mx-auto mb-4 animate-pulse"></div>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
            <div>
              <div className="h-12 bg-white/20 rounded-md w-24 mb-2 animate-pulse"></div>
              <div className="h-4 bg-white/20 rounded-md w-32 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="text-center">
              <div className="w-6 h-6 bg-white/20 rounded mx-auto mb-2 animate-pulse"></div>
              <div className="h-3 bg-white/20 rounded w-16 mx-auto mb-1 animate-pulse"></div>
              <div className="h-4 bg-white/20 rounded w-12 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
