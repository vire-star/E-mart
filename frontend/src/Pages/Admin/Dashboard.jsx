// Dashboard.jsx
import SideBar from '@/components/SideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex min-h-screen'>
      <SideBar/>
      <div className='flex-1 overflow-y-auto bg-gray-50'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
