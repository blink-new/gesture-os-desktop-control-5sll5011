import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Info, 
  Zap, 
  Github, 
  ExternalLink,
  Heart,
  Code,
  Users,
  Cpu,
  Camera,
  Hand
} from 'lucide-react'

export function About() {
  const features = [
    {
      icon: Hand,
      title: 'MediaPipe Integration',
      description: 'Advanced hand tracking using Google\'s MediaPipe framework'
    },
    {
      icon: Camera,
      title: 'Real-time Processing',
      description: 'Low-latency gesture recognition at 30+ FPS'
    },
    {
      icon: Cpu,
      title: 'Cross-platform',
      description: 'Native support for Windows, macOS, and iOS remote'
    },
    {
      icon: Code,
      title: 'Customizable',
      description: 'Create and train your own gesture mappings'
    }
  ]

  const techStack = [
    { name: 'MediaPipe', version: '0.10.9', type: 'Hand Tracking' },
    { name: 'OpenCV', version: '4.8.1', type: 'Computer Vision' },
    { name: 'PyQt6', version: '6.6.1', type: 'GUI Framework' },
    { name: 'NumPy', version: '1.24.3', type: 'Numerical Computing' },
    { name: 'TensorFlow', version: '2.13.0', type: 'Machine Learning' }
  ]

  const contributors = [
    { name: 'Alex Chen', role: 'Lead Developer', avatar: '👨‍💻' },
    { name: 'Sarah Kim', role: 'UI/UX Designer', avatar: '👩‍🎨' },
    { name: 'Mike Johnson', role: 'ML Engineer', avatar: '🤖' },
    { name: 'Lisa Wang', role: 'QA Engineer', avatar: '🔍' }
  ]

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-2xl flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Gesture OS
            </h1>
            <p className="text-slate-400">Hand Gesture Desktop Control System</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="text-emerald-400 border-emerald-400">
            v2.1.0
          </Badge>
          <Badge variant="outline" className="text-indigo-400 border-indigo-400">
            Beta
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              About Gesture OS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              Gesture OS is a revolutionary desktop application that transforms how you interact with your computer. 
              Using advanced computer vision and machine learning, it enables hands-free control through natural 
              hand gestures captured via your webcam.
            </p>
            
            <p className="text-slate-300 leading-relaxed">
              Built with cutting-edge technologies including MediaPipe for hand tracking and PyQt6 for the interface, 
              Gesture OS provides a seamless, intuitive way to control media playback, window management, system 
              functions, and more.
            </p>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Github className="w-4 h-4" />
                View Source
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Documentation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">{tech.name}</h3>
                    <p className="text-xs text-slate-400">{tech.type}</p>
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {tech.version}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contributors */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Contributors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl">{contributor.avatar}</div>
                  <div>
                    <h3 className="font-medium text-white">{contributor.name}</h3>
                    <p className="text-sm text-slate-400">{contributor.role}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-700 text-center">
              <p className="text-sm text-slate-400 flex items-center justify-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-400" /> by the Gesture OS team
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Architecture */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle>System Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Camera className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-medium text-white text-sm">Webcam Input</h3>
              <p className="text-xs text-slate-400">Video Stream</p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-8 h-0.5 bg-slate-600"></div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Hand className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-medium text-white text-sm">MediaPipe</h3>
              <p className="text-xs text-slate-400">Hand Tracking</p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-8 h-0.5 bg-slate-600"></div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Cpu className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-medium text-white text-sm">OS Commands</h3>
              <p className="text-xs text-slate-400">System Control</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">Processing Pipeline</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Video frames are captured from the webcam and processed through MediaPipe's hand tracking model. 
              The detected hand landmarks are analyzed to recognize specific gestures, which are then mapped to 
              corresponding system commands and executed with appropriate confidence thresholds.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* License & Legal */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle>License & Legal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-white mb-2">License</h3>
              <p className="text-slate-400">
                Gesture OS is released under the MIT License. You are free to use, modify, 
                and distribute this software in accordance with the license terms.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-2">Privacy</h3>
              <p className="text-slate-400">
                All gesture processing is performed locally on your device. No video data 
                or personal information is transmitted to external servers.
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-700 text-center text-xs text-slate-500">
            © 2024 Gesture OS Team. All rights reserved.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}