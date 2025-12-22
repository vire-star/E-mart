import { Spinner } from '@/components/ui/spinner'
import { useLoginHook } from '@/hooks/user.hook'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = () => {
    const { register, handleSubmit} = useForm()
    
    const {mutate, isPending} =useLoginHook()
    const loginHandler=(data)=>{
        mutate(data)
    }
  return (
    <div className='h-screen w-full flex items-center justify-center bg-zinc-50'>

        <form onSubmit={handleSubmit(loginHandler)}  className='flex flex-col items-center justify-center gap-7 shadow-lg rounded-md p-9 bg-zinc-100 hover:scale-120 duration-300 border border-zinc-300' action="">
            <h1 className='font-semibold '>Login Here</h1>

            <div className='flex flex-col w-full h-fit gap-3'>
                <input type="text" placeholder='Email' className='border border-zinc-400 rounded-md' {...register('email')} />
                <input type="password" placeholder='Password' className='border border-zinc-400 rounded-md' {...register('password')} />
            </div>

            <button type='submit' className='py-1 px-6 rounded-md bg-zinc-900 text-white'>
                <h1 className='text-center'>{isPending?<Spinner/>:"Login"} </h1>
            </button>

            <h1>Don't have an account? <Link to={'/register'} className='text-blue-500'>Register</Link></h1>
        </form>

    </div>
  )
}

export default Login