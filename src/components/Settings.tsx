import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Slider } from './ui/slider'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Settings as SettingsIcon, 
  Camera, 
  Hand, 
  Monitor, 
  Volume2,
  Smartphone,
  Apple,
  Save,
  RotateCcw
} from 'lucide-react'

export function Settings() {
  const [sensitivity, setSensitivity] = useState([75])
  const [confidence, setConfidence] = useState([80])
  const [smoothing, setSmoothing] = useState([60])
  const [enableSound, setEnableSound] = useState(true)
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [autoStart, setAutoStart] = useState(false)

  const platforms = [
    { id: 'windows', name: 'Windows', icon: Monitor, enabled: true },
    { id: 'macos', name: 'macOS', icon: Apple, enabled: true },
    { id: 'ios', name: 'iOS Remote', icon: Smartphone, enabled: false }
  ]

  const gestureSettings = [
    { name: 'Open Palm', enabled: true, sensitivity: 75 },
    { name: 'Closed Fist', enabled: true, sensitivity: 80 },
    { name: 'Peace Sign', enabled: true, sensitivity: 70 },
    { name: 'Thumbs Up', enabled: true, sensitivity: 85 },
    { name: 'Pinch Gesture', enabled: false, sensitivity: 90 },
    { name: 'Swipe Left', enabled: true, sensitivity: 65 }
  ]

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400">Configure gesture recognition and system preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="gestures">Gestures</TabsTrigger>
          <TabsTrigger value="camera">Camera</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* System Settings */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">Auto-start on boot</h3>
                  <p className="text-sm text-slate-400">Launch Gesture OS when system starts</p>
                </div>
                <Switch checked={autoStart} onCheckedChange={setAutoStart} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">Sound feedback</h3>
                  <p className="text-sm text-slate-400">Play sounds when gestures are recognized</p>
                </div>
                <Switch checked={enableSound} onCheckedChange={setEnableSound} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">Desktop notifications</h3>
                  <p className="text-sm text-slate-400">Show notifications for gesture events</p>
                </div>
                <Switch checked={enableNotifications} onCheckedChange={setEnableNotifications} />
              </div>
            </CardContent>
          </Card>

          {/* Recognition Settings */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>Recognition Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-medium text-white">Global Sensitivity</label>
                  <span className="text-sm text-slate-400">{sensitivity[0]}%</span>
                </div>
                <Slider
                  value={sensitivity}
                  onValueChange={setSensitivity}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Higher values make gestures easier to trigger
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-medium text-white">Confidence Threshold</label>
                  <span className="text-sm text-slate-400">{confidence[0]}%</span>
                </div>
                <Slider
                  value={confidence}
                  onValueChange={setConfidence}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Minimum confidence required to trigger actions
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-medium text-white">Motion Smoothing</label>
                  <span className="text-sm text-slate-400">{smoothing[0]}%</span>
                </div>
                <Slider
                  value={smoothing}
                  onValueChange={setSmoothing}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Reduces jitter and false positives
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gestures" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hand className="w-5 h-5" />
                Gesture Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gestureSettings.map((gesture, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-white">{gesture.name}</h3>
                        <Badge variant={gesture.enabled ? "default" : "secondary"}>
                          {gesture.enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                      <Switch 
                        checked={gesture.enabled} 
                        onCheckedChange={() => {}} 
                      />
                    </div>
                    
                    {gesture.enabled && (
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm text-slate-400">Sensitivity</label>
                          <span className="text-sm text-slate-400">{gesture.sensitivity}%</span>
                        </div>
                        <Slider
                          value={[gesture.sensitivity]}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="camera" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Camera Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Camera Device
                  </label>
                  <select className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-white">
                    <option>Default Camera</option>
                    <option>USB Camera (HD)</option>
                    <option>Integrated Webcam</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Resolution
                  </label>
                  <select className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-white">
                    <option>1920x1080 (HD)</option>
                    <option>1280x720 (HD)</option>
                    <option>640x480 (SD)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Frame Rate
                  </label>
                  <select className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-white">
                    <option>30 FPS</option>
                    <option>60 FPS</option>
                    <option>15 FPS</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Mirror Mode
                  </label>
                  <select className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-white">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">Show hand skeleton</h3>
                  <p className="text-sm text-slate-400">Display hand tracking overlay</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">Record gestures</h3>
                  <p className="text-sm text-slate-400">Save gesture data for analysis</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platform" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>Platform Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platforms.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <div key={platform.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-slate-400" />
                        <div>
                          <h3 className="font-medium text-white">{platform.name}</h3>
                          <p className="text-sm text-slate-400">
                            {platform.enabled ? 'Integration active' : 'Not configured'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={platform.enabled ? "default" : "secondary"}>
                          {platform.enabled ? 'Active' : 'Inactive'}
                        </Badge>
                        <Switch checked={platform.enabled} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* iOS Remote Setup */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                iOS Remote Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-400 text-sm">
                Control your desktop remotely using your iPhone or iPad
              </p>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">Setup Instructions</h3>
                <ol className="text-sm text-slate-400 space-y-1">
                  <li>1. Download Gesture OS Remote from App Store</li>
                  <li>2. Ensure both devices are on the same network</li>
                  <li>3. Scan QR code to pair devices</li>
                  <li>4. Enable remote control permissions</li>
                </ol>
              </div>

              <Button className="w-full" variant="outline">
                Generate Pairing QR Code
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}