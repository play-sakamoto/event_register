import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import Spinner from '../ui/spinner'

const PrivateRoute = () => {
  const { isLogin } = useAuth()

  if (isLogin === null) {
    return <Spinner />
  }
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
