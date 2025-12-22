// SideBar.jsx
import { Home, LayoutDashboard, Package } from 'lucide-react'
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Analytics', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Products', icon: Package, path: '/dashboard/product' }
  ]

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className='w-64 h-screen bg-white border-r border-gray-200 sticky top-0'>
      <div className='p-6'>
        <h2 className='text-xl font-bold text-gray-900 mb-8'>Dashboard</h2>
        
        <nav className='space-y-2'>
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  active 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className='w-5 h-5' />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default SideBar
