import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize2,
  Minimize2,
  SkipBack,
  SkipForward,
  Screenshot,
  Lock,
  ArrowLeft,
  ArrowRight,
  Hand,
  Settings,
  Zap
} from 'lucide-react'

interface GestureControlsProps {
  isTracking: boolean
}

export function GestureControls({ isTracking }: GestureControlsProps) {
  const [enabledGestures, setEnabledGestures] = useState<Record<string, boolean>>({
    'play-pause': true,
    'volume-up': true,
    'volume-down': true,
    'volume-mute': true,
    'window-switch-left': true,
    'window-switch-right': true,
    'window-minimize': true,
    'window-maximize': true,
    'screenshot': true,
    'lock-screen': false
  })

  const gestureControls = [
    {
      id: 'play-pause',
      name: 'Play/Pause Media',
      gesture: 'Open Palm',
      icon: Play,
      description: 'Toggle media playback',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    },
    {
      id: 'volume-up',
      name: 'Volume Up',
      gesture: 'Two Fingers Up',
      icon: Volume2,
      description: 'Increase system volume',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: 'volume-down',
      name: 'Volume Down',
      gesture: 'Two Fingers Down',
      icon: Volume2,
      description: 'Decrease system volume',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: 'volume-mute',
      name: 'Mute/Unmute',
      gesture: 'Closed Fist',
      icon: VolumeX,
      description: 'Toggle audio mute',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      id: 'window-switch-left',
      name: 'Previous Window',
      gesture: 'Swipe Left',
      icon: ArrowLeft,
      description: 'Switch to previous application',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      id: 'window-switch-right',
      name: 'Next Window',
      gesture: 'Swipe Right',
      icon: ArrowRight,
      description: 'Switch to next application',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      id: 'window-minimize',
      name: 'Minimize Window',
      gesture: 'Pinch In',
      icon: Minimize2,
      description: 'Minimize active window',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      id: 'window-maximize',
      name: 'Maximize Window',
      gesture: 'Pinch Out',
      icon: Maximize2,
      description: 'Maximize active window',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      id: 'screenshot',
      name: 'Take Screenshot',
      gesture: 'Peace Sign',
      icon: Screenshot,
      description: 'Capture screen screenshot',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/20'
    },
    {
      id: 'lock-screen',
      name: 'Lock Screen',
      gesture: 'Thumbs Up',
      icon: Lock,
      description: 'Lock the system',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    }
  ]

  const toggleGesture = (gestureId: string) => {
    setEnabledGestures(prev => ({
      ...prev,
      [gestureId]: !prev[gestureId]
    }))
  }

  const enabledCount = Object.values(enabledGestures).filter(Boolean).length

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Hand className="w-5 h-5" />
            Gesture Controls
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-emerald-400 border-emerald-400">
              {enabledCount}/10 Active
            </Badge>
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="w-4 h-4" />
              Configure
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
          {gestureControls.map((control) => {
            const Icon = control.icon
            const isEnabled = enabledGestures[control.id]
            
            return (
              <div
                key={control.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  isEnabled 
                    ? 'border-slate-600 bg-slate-800/50' 
                    : 'border-slate-700 bg-slate-800/20 opacity-60'
                } ${isTracking && isEnabled ? 'hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${control.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${control.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-white text-sm">{control.name}</h3>
                      <p className="text-xs text-slate-400 mb-1">{control.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs font-mono">
                          {control.gesture}
                        </Badge>
                        {isTracking && isEnabled && (
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-emerald-400" />
                            <span className="text-xs text-emerald-400">Ready</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={() => toggleGesture(control.id)}
                  />
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-white text-sm">Quick Actions</h3>
            <Button variant="outline" size="sm" onClick={() => {
              const allEnabled = Object.values(enabledGestures).every(Boolean)
              const newState = Object.keys(enabledGestures).reduce((acc, key) => {
                acc[key] = !allEnabled
                return acc
              }, {} as Record<string, boolean>)
              setEnabledGestures(newState)
            }}>
              {Object.values(enabledGestures).every(Boolean) ? 'Disable All' : 'Enable All'}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Sensitivity
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Hand className="w-4 h-4" />
              Train New
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}