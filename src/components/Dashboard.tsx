import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Play, 
  Pause, 
  Camera, 
  Hand, 
  Volume2, 
  VolumeX,
  Maximize2,
  Minimize2,
  SkipBack,
  SkipForward,
  Screenshot,
  Lock,
  Monitor,
  Activity,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react'
import { WebcamFeed } from './WebcamFeed'
import { GestureControls } from './GestureControls'
import { PerformanceMetrics } from './PerformanceMetrics'

export function Dashboard() {
  const [isTracking, setIsTracking] = useState(false)
  const [currentGesture, setCurrentGesture] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [gesturesDetected, setGesturesDetected] = useState(247)
  const [accuracy, setAccuracy] = useState(94.2)

  // Mock gesture detection
  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(() => {
        const gestures = ['Open Palm', 'Closed Fist', 'Peace Sign', 'Thumbs Up', null]
        const randomGesture = gestures[Math.floor(Math.random() * gestures.length)]
        setCurrentGesture(randomGesture)
        setConfidence(randomGesture ? Math.random() * 40 + 60 : 0)
        
        if (randomGesture) {
          setGesturesDetected(prev => prev + 1)
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isTracking])

  const quickStats = [
    {
      title: 'Gestures Today',
      value: gesturesDetected.toString(),
      change: '+12%',
      icon: Hand,
      color: 'text-emerald-400'
    },
    {
      title: 'Accuracy Rate',
      value: `${accuracy}%`,
      change: '+2.1%',
      icon: Target,
      color: 'text-indigo-400'
    },
    {
      title: 'Response Time',
      value: '23ms',
      change: '-5ms',
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      title: 'Uptime',
      value: '4h 32m',
      change: 'Active',
      icon: Activity,
      color: 'text-blue-400'
    }
  ]

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Real-time gesture control and monitoring</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant={isTracking ? "default" : "secondary"} className="px-3 py-1">
            <div className={`w-2 h-2 rounded-full mr-2 ${isTracking ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></div>
            {isTracking ? 'Tracking Active' : 'Tracking Inactive'}
          </Badge>
          
          <Button
            onClick={() => setIsTracking(!isTracking)}
            className={`gap-2 ${
              isTracking 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isTracking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-xs ${stat.change.startsWith('+') ? 'text-emerald-400' : stat.change.startsWith('-') ? 'text-red-400' : 'text-slate-400'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Webcam Feed */}
        <div className="lg:col-span-2">
          <WebcamFeed 
            isTracking={isTracking} 
            currentGesture={currentGesture}
            confidence={confidence}
          />
        </div>

        {/* Current Status */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Hand className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">
                {currentGesture || 'No Gesture'}
              </h3>
              <p className="text-sm text-slate-400">
                {isTracking ? 'Detecting...' : 'Tracking stopped'}
              </p>
            </div>

            {currentGesture && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Confidence</span>
                  <span className="text-white">{Math.round(confidence)}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium text-white">Recent Actions</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Volume Up</span>
                  <span className="text-slate-500">2s ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Play/Pause</span>
                  <span className="text-slate-500">15s ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Window Switch</span>
                  <span className="text-slate-500">1m ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gesture Controls */}
        <GestureControls isTracking={isTracking} />
        
        {/* Performance Metrics */}
        <PerformanceMetrics />
      </div>
    </div>
  )
}