import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  LayoutDashboard, 
  Hand, 
  Settings, 
  Info,
  Zap,
  Activity,
  Wifi,
  WifiOff
} from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: 'dashboard' | 'training' | 'settings' | 'about') => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const isConnected = true // Mock connection status

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'training',
      label: 'Gesture Training',
      icon: Hand,
      badge: 'New'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      badge: null
    }
  ]

  return (
    <div className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Gesture OS
            </h1>
            <p className="text-xs text-slate-400">v2.1.0 Beta</p>
          </div>
        </div>
        
        {/* Connection Status */}
        <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg">
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400">Connected</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse ml-auto"></div>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">Disconnected</span>
              <div className="w-2 h-2 bg-red-400 rounded-full ml-auto"></div>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              onClick={() => onPageChange(item.id as any)}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          )
        })}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-slate-800">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">CPU Usage</span>
            <span className="text-white">23%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full" style={{ width: '23%' }}></div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Memory</span>
            <span className="text-white">1.2GB</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400">System running smoothly</span>
          </div>
        </div>
      </div>
    </div>
  )
}