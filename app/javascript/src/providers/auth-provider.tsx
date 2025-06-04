import React, { createContext, useCallback, useEffect, useState } from 'react'
import * as authService from '../services/auth'
import { User } from '../types/user'

export const AuthContext = createContext<{
  isLogin: boolean | null
  currentUser: User | null
  updateAuthStatus: () => Promise<void>
}>({
  isLogin: false,
  currentUser: null,
  updateAuthStatus: async () => {},
})

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const updateAuthStatus = useCallback(async () => {
    const user = await authService.fetchCurrentUser()
    setIsLogin(!!user)
    setCurrentUser(user)
  }, [])

  useEffect(() => {
    updateAuthStatus()
  }, [updateAuthStatus])

  return (
    <AuthContext.Provider value={{ isLogin, currentUser, updateAuthStatus }}>
      {children}
    </AuthContext.Provider>
  )
}
