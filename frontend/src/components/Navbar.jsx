import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutHook } from '@/hooks/user.hook'
import { useUserStore } from '@/store/userStore'
import { ShoppingCart } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const clearUser = useUserStore((state) => state.clearUser)
  const {mutate} = useLogoutHook()
    
  const logoutHandler = () => {
    mutate()
    clearUser()
  }

  return (
    <nav className='sticky top-0 z-50 bg-white border-b border-gray-200'>
      <div className='max-w-[1400px] mx-auto px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          
          {/* Logo */}
          <Link to={'/'} className='text-xl font-bold text-gray-900 tracking-tight'>
            E-Mart
          </Link>

          {/* Navigation Links */}
          <div className='hidden md:flex items-center gap-8'>
            <Link 
              to={'/'} 
              className='text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors'
            >
              Home
            </Link>
            <Link 
              to={'/product'} 
              className='text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors'
            >
              Products
            </Link>
          </div>

          {/* Right Section - Cart & Profile */}
          <div className='flex items-center gap-6'>
            
            {/* Cart Icon with Badge */}
            <button 
              onClick={() => navigate('/cart')} 
              className='relative p-2 hover:bg-gray-100 rounded-lg transition-colors'
              aria-label='Shopping cart'
            >
              <ShoppingCart className='w-5 h-5 text-gray-700' />
              {user?.cartItem?.length > 0 && (
                <span className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full'>
                  {user.cartItem.length}
                </span>
              )}
            </button>

            {/* User Profile Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={user?.profilePhoto} alt={user?.name} />
                    <AvatarFallback className='bg-gray-900 text-white text-sm font-medium'>
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className='hidden lg:block text-sm font-medium text-gray-900'>
                    {user?.name}
                  </span>
                </button>
              </PopoverTrigger>
              
              <PopoverContent className='w-48 p-2' align='end'>
                <div className='flex flex-col gap-1'>
                  <Link 
                    to={'/profile'} 
                    className='px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors'
                  >
                    Profile
                  </Link>
                  
                  {user?.owner && (
                    <button 
                      onClick={() => navigate('/dashboard')} 
                      className='px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-left'
                    >
                      Dashboard
                    </button>
                  )}
                  
                  <button 
                    onClick={logoutHandler} 
                    className='px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors text-left'
                  >
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
