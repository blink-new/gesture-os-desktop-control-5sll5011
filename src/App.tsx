import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './components/Dashboard'
import { GestureTraining } from './components/GestureTraining'
import { Settings } from './components/Settings'
import { About } from './components/About'
import { Toaster } from './components/ui/toaster'

type Page = 'dashboard' | 'training' | 'settings' | 'about'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'training':
        return <GestureTraining />
      case 'settings':
        return <Settings />
      case 'about':
        return <About />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-hidden">
        {renderPage()}
      </main>
      <Toaster />
    </div>
  )
}

export default App