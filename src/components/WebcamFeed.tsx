import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Camera, 
  CameraOff, 
  Settings, 
  Maximize2,
  Hand,
  Eye,
  EyeOff
} from 'lucide-react'

interface WebcamFeedProps {
  isTracking: boolean
  currentGesture: string | null
  confidence: number
}

export function WebcamFeed({ isTracking, currentGesture, confidence }: WebcamFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)
  const [cameraActive, setCameraActive] = useState(false)
  const [handLandmarks, setHandLandmarks] = useState<Array<{x: number, y: number}>>([])

  // Mock hand landmarks for demonstration
  useEffect(() => {
    if (isTracking && currentGesture) {
      // Generate mock hand landmarks
      const mockLandmarks = Array.from({ length: 21 }, (_, i) => ({
        x: 200 + Math.sin(i * 0.3) * 100 + Math.random() * 20,
        y: 200 + Math.cos(i * 0.3) * 100 + Math.random() * 20
      }))
      setHandLandmarks(mockLandmarks)
    } else {
      setHandLandmarks([])
    }
  }, [isTracking, currentGesture])

  // Initialize camera
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setCameraActive(true)
        }
      } catch (error) {
        console.error('Camera access denied:', error)
        setCameraActive(false)
      }
    }

    initCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // Draw hand landmarks on canvas
  useEffect(() => {
    if (!canvasRef.current || !showOverlay) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (handLandmarks.length > 0) {
      // Draw hand connections
      const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
        [0, 5], [5, 6], [6, 7], [7, 8], // Index
        [0, 9], [9, 10], [10, 11], [11, 12], // Middle
        [0, 13], [13, 14], [14, 15], [15, 16], // Ring
        [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
        [5, 9], [9, 13], [13, 17] // Palm
      ]

      // Draw connections
      ctx.strokeStyle = '#10B981'
      ctx.lineWidth = 2
      connections.forEach(([start, end]) => {
        if (handLandmarks[start] && handLandmarks[end]) {
          ctx.beginPath()
          ctx.moveTo(handLandmarks[start].x, handLandmarks[start].y)
          ctx.lineTo(handLandmarks[end].x, handLandmarks[end].y)
          ctx.stroke()
        }
      })

      // Draw landmarks
      ctx.fillStyle = '#6366F1'
      handLandmarks.forEach((landmark, index) => {
        ctx.beginPath()
        ctx.arc(landmark.x, landmark.y, index === 0 ? 6 : 4, 0, 2 * Math.PI)
        ctx.fill()
        
        // Add glow effect
        ctx.shadowColor = '#6366F1'
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }
  }, [handLandmarks, showOverlay])

  return (
    <Card className={`bg-slate-900/50 border-slate-800 ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Live Camera Feed
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Badge variant={cameraActive ? "default" : "destructive"}>
              {cameraActive ? 'Active' : 'Inactive'}
            </Badge>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOverlay(!showOverlay)}
              className="gap-1"
            >
              {showOverlay ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              Overlay
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="relative bg-slate-800 aspect-video overflow-hidden">
          {cameraActive ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Hand tracking overlay */}
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ display: showOverlay ? 'block' : 'none' }}
              />
              
              {/* Gesture indicator */}
              {currentGesture && isTracking && (
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Hand className="w-5 h-5 text-emerald-400" />
                    <span className="text-white font-medium">{currentGesture}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-300 min-w-[3rem]">
                      {Math.round(confidence)}%
                    </span>
                  </div>
                </div>
              )}
              
              {/* Tracking status */}
              <div className="absolute top-4 right-4">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  isTracking 
                    ? 'bg-emerald-900/70 text-emerald-300' 
                    : 'bg-slate-900/70 text-slate-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isTracking ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                  }`}></div>
                  <span className="text-sm font-medium">
                    {isTracking ? 'Tracking' : 'Stopped'}
                  </span>
                </div>
              </div>
              
              {/* Center crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 border-2 border-slate-500/50 rounded-full">
                  <div className="w-full h-full border-2 border-emerald-400/50 rounded-full animate-ping"></div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <CameraOff className="w-16 h-16 mb-4" />
              <h3 className="text-lg font-medium mb-2">Camera Not Available</h3>
              <p className="text-sm text-center max-w-sm">
                Please check your camera permissions and ensure no other applications are using the camera.
              </p>
              <Button className="mt-4 gap-2" onClick={() => window.location.reload()}>
                <Camera className="w-4 h-4" />
                Retry Camera Access
              </Button>
            </div>
          )}
        </div>
        
        {/* Camera controls */}
        <div className="p-4 bg-slate-800/50 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>Resolution: 640x480</span>
              <span>FPS: 30</span>
              <span>Format: WebRTC</span>
            </div>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Camera Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}