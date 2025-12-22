import { useRegisterHook } from '@/hooks/user.hook'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Register = () => {

    const {register, handleSubmit} = useForm()
    const {mutate} = useRegisterHook()
    const registerHandler=(data)=>{
        mutate(data)
    }
  return (
    <div className='h-screen w-full flex items-center justify-center bg-zinc-50'>

        <form  onClick={handleSubmit(registerHandler)} className='flex flex-col items-center justify-center gap-7 shadow-lg rounded-md p-9 bg-zinc-100 hover:scale-120 duration-300 border border-zinc-300' action="">
            <h1 className='font-semibold '>Register</h1>

            <div className='flex flex-col w-full h-fit gap-3'>
                <input type="text" placeholder='Enter Your Name' className='border border-zinc-400 rounded-md' {...register('name')} />
                <input type="text" placeholder='Enter Your Email' className='border border-zinc-400 rounded-md'{...register('email')} />
                <input type="password" placeholder='Enter Your Password' className='border border-zinc-400 rounded-md' {...register('password')} />
            </div>

            <button type='submit' className='py-1 px-6 rounded-md bg-zinc-900 text-white'>
                <h1>Register </h1>
            </button>

            <h1>Already have an account? <Link to={'/login'} className='text-blue-500'>Login</Link></h1>
        </form>

    </div>
  )
}

export default Register