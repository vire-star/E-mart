import Login from '@/Pages/Auth/Login'
import Register from '@/Pages/Auth/Register'
import Home from '@/Pages/User/Home'
import Profile from '@/Pages/User/Profile'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './Protectedroutes'
import Product from '@/Pages/User/Product'
import Dashboard from '@/Pages/Admin/Dashboard'
import AnalyticDashboard from '@/Pages/Admin/AnalyticDashboard'
import ProductDashboard from '@/Pages/Admin/ProductDashboard'
import SingleProduct from '@/Pages/User/SingleProduct'
import CartPage from '@/Pages/User/CartPage'
import Purchase from '@/Pages/User/Purchase'

const MainRoutes = () => {
  return (
    
    <Routes>
        <Route path='/' element={
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
        }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={
            <ProtectedRoute>
                <Profile/>
            </ProtectedRoute>
        }/>
        <Route path='/product' element={
            <ProtectedRoute>
                <Product/>
            </ProtectedRoute>
        }/>
        <Route path='/product/:id' element={
            <ProtectedRoute>
                <SingleProduct/>
            </ProtectedRoute>
        }/>
        <Route path='/cart' element={
            <ProtectedRoute>
                <CartPage/>
            </ProtectedRoute>
        }/>
        <Route path='/purchase' element={
            <ProtectedRoute>
                <Purchase/>
            </ProtectedRoute>
        }/>

        <Route path='/dashboard' element={
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>
        }>
        <Route index element={
            <ProtectedRoute>

                <AnalyticDashboard/>
            </ProtectedRoute>
            }/>
        <Route path='product' element={
            <ProtectedRoute>
                <ProductDashboard/>

            </ProtectedRoute>
            }/>


        </Route>
    </Routes>
  )
}

export default MainRoutes