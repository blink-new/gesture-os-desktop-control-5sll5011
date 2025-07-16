import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { 
  Activity, 
  Cpu, 
  MemoryStick, 
  Zap, 
  TrendingUp,
  TrendingDown,
  Wifi,
  Camera
} from 'lucide-react'

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    fps: 30,
    latency: 23,
    cpuUsage: 25,
    memoryUsage: 45,
    accuracy: 94.2,
    gesturesPerMinute: 12
  })

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        fps: Math.max(25, Math.min(60, prev.fps + (Math.random() - 0.5) * 4)),
        latency: Math.max(15, Math.min(50, prev.latency + (Math.random() - 0.5) * 6)),
        cpuUsage: Math.max(15, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 8)),
        memoryUsage: Math.max(30, Math.min(70, prev.memoryUsage + (Math.random() - 0.5) * 6)),
        accuracy: Math.max(85, Math.min(98, prev.accuracy + (Math.random() - 0.5) * 2)),
        gesturesPerMinute: Math.max(5, Math.min(25, prev.gesturesPerMinute + (Math.random() - 0.5) * 3))
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const performanceItems = [
    {
      label: 'Frame Rate',
      value: `${Math.round(metrics.fps)} FPS`,
      progress: (metrics.fps / 60) * 100,
      icon: Camera,
      color: metrics.fps > 25 ? 'text-emerald-400' : 'text-red-400',
      trend: metrics.fps > 28 ? 'up' : 'down'
    },
    {
      label: 'Response Time',
      value: `${Math.round(metrics.latency)}ms`,
      progress: Math.max(0, 100 - (metrics.latency / 50) * 100),
      icon: Zap,
      color: metrics.latency < 30 ? 'text-emerald-400' : 'text-yellow-400',
      trend: metrics.latency < 25 ? 'up' : 'down'
    },
    {
      label: 'CPU Usage',
      value: `${Math.round(metrics.cpuUsage)}%`,
      progress: metrics.cpuUsage,
      icon: Cpu,
      color: metrics.cpuUsage < 50 ? 'text-emerald-400' : metrics.cpuUsage < 70 ? 'text-yellow-400' : 'text-red-400',
      trend: metrics.cpuUsage < 40 ? 'up' : 'down'
    },
    {
      label: 'Memory Usage',
      value: `${Math.round(metrics.memoryUsage)}%`,
      progress: metrics.memoryUsage,
      icon: MemoryStick,
      color: metrics.memoryUsage < 60 ? 'text-emerald-400' : 'text-yellow-400',
      trend: metrics.memoryUsage < 50 ? 'up' : 'down'
    },
    {
      label: 'Accuracy Rate',
      value: `${metrics.accuracy.toFixed(1)}%`,
      progress: metrics.accuracy,
      icon: Activity,
      color: metrics.accuracy > 90 ? 'text-emerald-400' : 'text-yellow-400',
      trend: metrics.accuracy > 92 ? 'up' : 'down'
    },
    {
      label: 'Gestures/Min',
      value: Math.round(metrics.gesturesPerMinute).toString(),
      progress: (metrics.gesturesPerMinute / 25) * 100,
      icon: Wifi,
      color: 'text-indigo-400',
      trend: metrics.gesturesPerMinute > 10 ? 'up' : 'down'
    }
  ]

  const getStatusColor = () => {
    const avgPerformance = (
      (metrics.fps / 60) * 100 +
      Math.max(0, 100 - (metrics.latency / 50) * 100) +
      Math.max(0, 100 - metrics.cpuUsage) +
      Math.max(0, 100 - metrics.memoryUsage) +
      metrics.accuracy
    ) / 5

    if (avgPerformance > 80) return 'text-emerald-400'
    if (avgPerformance > 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusText = () => {
    const avgPerformance = (
      (metrics.fps / 60) * 100 +
      Math.max(0, 100 - (metrics.latency / 50) * 100) +
      Math.max(0, 100 - metrics.cpuUsage) +
      Math.max(0, 100 - metrics.memoryUsage) +
      metrics.accuracy
    ) / 5

    if (avgPerformance > 80) return 'Excellent'
    if (avgPerformance > 60) return 'Good'
    if (avgPerformance > 40) return 'Fair'
    return 'Poor'
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Performance Metrics
          </CardTitle>
          
          <Badge variant="outline" className={`${getStatusColor()} border-current`}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {performanceItems.map((item, index) => {
            const Icon = item.icon
            const TrendIcon = item.trend === 'up' ? TrendingUp : TrendingDown
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-sm text-slate-300">{item.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{item.value}</span>
                    <TrendIcon className={`w-3 h-3 ${
                      item.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                    }`} />
                  </div>
                </div>
                
                <Progress 
                  value={item.progress} 
                  className="h-2"
                />
              </div>
            )
          })}
        </div>
        
        {/* System Health Summary */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <h3 className="text-sm font-medium text-white mb-3">System Health</h3>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Uptime</span>
                <span className="text-white">4h 32m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gestures Detected</span>
                <span className="text-white">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Errors</span>
                <span className="text-emerald-400">0</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Camera Status</span>
                <span className="text-emerald-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Model Version</span>
                <span className="text-white">v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Update</span>
                <span className="text-white">2s ago</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Tips */}
        {(metrics.cpuUsage > 70 || metrics.latency > 40) && (
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-400 mb-1">Performance Tips</h4>
            <ul className="text-xs text-yellow-300 space-y-1">
              {metrics.cpuUsage > 70 && (
                <li>• Close unnecessary applications to reduce CPU usage</li>
              )}
              {metrics.latency > 40 && (
                <li>• Lower camera resolution for better response time</li>
              )}
              <li>• Ensure good lighting for optimal gesture detection</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}