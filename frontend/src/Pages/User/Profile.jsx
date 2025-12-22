import { Pencil } from 'lucide-react'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { useUpdateProfileHook } from '@/hooks/user.hook'
import { Spinner } from '@/components/ui/spinner'
import { useUserStore } from '@/store/userStore'

const Profile = () => {
  const user = useUserStore((state) => state.user)
  const {register, handleSubmit, reset} = useForm()
  const {mutate, isPending} = useUpdateProfileHook()

  const updateFormHandler = (data) => {
    const formdata = new FormData()

    if(data.name) {
      formdata.append("name", data.name)
    }
    if(data.profilePhoto && data.profilePhoto[0]) {
      formdata.append("profilePhoto", data.profilePhoto[0])
    }
    mutate(formdata, {
      onSuccess: () => reset()
    })
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='w-full max-w-md p-8'>
        
        {/* Avatar with Edit */}
        <div className='relative w-32 h-32 mx-auto mb-8'>
          <img 
            src={user?.profilePhoto} 
            className='w-full h-full rounded-full object-cover border border-gray-200' 
            alt={user?.name} 
          />
          
          <Dialog>
            <DialogTrigger asChild>
              <button className='absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors'>
                <Pencil className='w-4 h-4' />
              </button>
            </DialogTrigger>
            
            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your name and profile photo
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(updateFormHandler)} className='space-y-4 mt-4'>
                <input 
                  type="text" 
                  placeholder='Name' 
                  className='w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                  {...register('name')}
                />
                
                <input 
                  type="file" 
                  accept="image/*"
                  className='w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none'
                  {...register('profilePhoto')}
                />
                
                <button 
                  type='submit' 
                  disabled={isPending}
                  className='w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors disabled:opacity-50 flex items-center justify-center'
                >
                  {isPending ? <Spinner /> : "Update"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* User Info */}
        <div className='text-center space-y-6'>
          <h1 className='text-3xl font-bold text-gray-900'>{user?.name}</h1>
          
          <div className='space-y-2 text-sm text-gray-600'>
            <p>Account Type: <span className='font-medium text-gray-900'>{user?.owner ? "Admin" : "Customer"}</span></p>
            <p>Cart Items: <span className='font-medium text-gray-900'>{user?.cartItem?.length || 0}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
