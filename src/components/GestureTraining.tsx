import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Hand, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle,
  Circle,
  Target,
  Zap,
  BookOpen,
  Save,
  Trash2,
  Plus
} from 'lucide-react'

export function GestureTraining() {
  const [currentGesture, setCurrentGesture] = useState(0)
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [completedGestures, setCompletedGestures] = useState<number[]>([])
  const [countdown, setCountdown] = useState(0)

  const gestures = [
    {
      name: 'Open Palm',
      description: 'Hold your hand open with fingers spread',
      action: 'Play/Pause Media',
      difficulty: 'Easy',
      samples: 25,
      icon: '✋'
    },
    {
      name: 'Closed Fist',
      description: 'Make a tight fist with all fingers closed',
      action: 'Mute/Unmute Audio',
      difficulty: 'Easy',
      samples: 25,
      icon: '✊'
    },
    {
      name: 'Peace Sign',
      description: 'Show two fingers in a V shape',
      action: 'Take Screenshot',
      difficulty: 'Medium',
      samples: 30,
      icon: '✌️'
    },
    {
      name: 'Thumbs Up',
      description: 'Point your thumb upward',
      action: 'Lock Screen',
      difficulty: 'Easy',
      samples: 25,
      icon: '👍'
    },
    {
      name: 'Pinch Gesture',
      description: 'Bring thumb and index finger together',
      action: 'Minimize Window',
      difficulty: 'Hard',
      samples: 40,
      icon: '🤏'
    },
    {
      name: 'Swipe Left',
      description: 'Move your hand from right to left',
      action: 'Previous Window',
      difficulty: 'Medium',
      samples: 35,
      icon: '👈'
    }
  ]

  // Training countdown
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTraining && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    } else if (isTraining && countdown === 0) {
      // Start actual training
      const progressInterval = setInterval(() => {
        setTrainingProgress(prev => {
          if (prev >= 100) {
            setIsTraining(false)
            setCompletedGestures(prev => [...prev, currentGesture])
            return 0
          }
          return prev + 2
        })
      }, 100)
      
      return () => clearInterval(progressInterval)
    }
    
    return () => clearInterval(interval)
  }, [isTraining, countdown, currentGesture])

  const startTraining = (gestureIndex: number) => {
    setCurrentGesture(gestureIndex)
    setIsTraining(true)
    setCountdown(3)
    setTrainingProgress(0)
  }

  const stopTraining = () => {
    setIsTraining(false)
    setCountdown(0)
    setTrainingProgress(0)
  }

  const resetGesture = (gestureIndex: number) => {
    setCompletedGestures(prev => prev.filter(i => i !== gestureIndex))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-400 border-emerald-400'
      case 'Medium': return 'text-yellow-400 border-yellow-400'
      case 'Hard': return 'text-red-400 border-red-400'
      default: return 'text-slate-400 border-slate-400'
    }
  }

  const completionRate = (completedGestures.length / gestures.length) * 100

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gesture Training</h1>
          <p className="text-slate-400">Train and calibrate your hand gestures for better recognition</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-indigo-400 border-indigo-400">
            {completedGestures.length}/{gestures.length} Complete
          </Badge>
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Custom
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Training Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Overall Completion</span>
              <span className="text-white font-medium">{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{completedGestures.length}</div>
                <div className="text-sm text-slate-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{gestures.length - completedGestures.length}</div>
                <div className="text-sm text-slate-400">Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">
                  {completedGestures.reduce((acc, i) => acc + gestures[i].samples, 0)}
                </div>
                <div className="text-sm text-slate-400">Samples</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Area */}
      {isTraining && (
        <Card className="bg-slate-900/50 border-slate-800 border-indigo-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              Training: {gestures[currentGesture].name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              {countdown > 0 ? (
                <div>
                  <div className="text-6xl font-bold text-indigo-400 mb-4">{countdown}</div>
                  <p className="text-slate-300">Get ready to perform the gesture...</p>
                </div>
              ) : (
                <div>
                  <div className="text-8xl mb-4">{gestures[currentGesture].icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{gestures[currentGesture].name}</h3>
                  <p className="text-slate-300 mb-4">{gestures[currentGesture].description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Training Progress</span>
                      <span className="text-white">{Math.round(trainingProgress)}%</span>
                    </div>
                    <Progress value={trainingProgress} className="h-3" />
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    onClick={stopTraining}
                    className="mt-4 gap-2"
                  >
                    <Pause className="w-4 h-4" />
                    Stop Training
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gesture List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gestures.map((gesture, index) => {
          const isCompleted = completedGestures.includes(index)
          const isCurrentlyTraining = isTraining && currentGesture === index
          
          return (
            <Card 
              key={index} 
              className={`bg-slate-900/50 border-slate-800 transition-all duration-200 ${
                isCurrentlyTraining ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : ''
              } ${isCompleted ? 'border-emerald-500/50' : ''}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{gesture.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{gesture.name}</CardTitle>
                      <p className="text-sm text-slate-400">{gesture.action}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getDifficultyColor(gesture.difficulty)}>
                      {gesture.difficulty}
                    </Badge>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-slate-300 mb-4">{gesture.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-400">Required samples:</span>
                  <span className="text-sm text-white">{gesture.samples}</span>
                </div>
                
                <div className="flex gap-2">
                  {!isCompleted ? (
                    <Button 
                      onClick={() => startTraining(index)}
                      disabled={isTraining}
                      className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Play className="w-4 h-4" />
                      Start Training
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => resetGesture(index)}
                      variant="outline"
                      className="flex-1 gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retrain
                    </Button>
                  )}
                  
                  <Button variant="outline" size="icon">
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Training Tips */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Training Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-white mb-3">Best Practices</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  Ensure good lighting conditions
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  Keep your hand within the camera frame
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  Perform gestures at a steady pace
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  Maintain consistent hand positioning
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-3">Troubleshooting</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  If recognition fails, retrain the gesture
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Adjust camera angle for better visibility
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Clean camera lens for clearer image
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Check sensitivity settings if needed
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {completionRate === 100 && (
        <Card className="bg-emerald-900/20 border-emerald-700/50">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Training Complete!</h3>
              <p className="text-slate-300">
                All gestures have been successfully trained. Your Gesture OS is ready for optimal performance.
              </p>
              <div className="flex justify-center gap-3">
                <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <Save className="w-4 h-4" />
                  Save Configuration
                </Button>
                <Button variant="outline" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Reset All Training
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}