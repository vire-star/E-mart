import React from 'react'
import { Button } from './components/ui/button'
import MainRoutes from './Routes/MainRoutes'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'

const App = () => {

  const location = useLocation()
  const hiddenRoute = ['/login', '/register','/dashboard','/purchase']
  const shouldHideNavbar = hiddenRoute.some((route)=>location.pathname.startsWith(route))
  return (
    <div>
      
      {!shouldHideNavbar && <Navbar/>}
      <MainRoutes/>
    </div>
  )
}

export default App