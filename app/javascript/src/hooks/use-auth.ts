import { useCallback, useContext } from 'react'
import * as authService from '../services/auth'
import { AuthContext } from '../providers/auth-provider'

export const useAuth = () => {
  const { isLogin, currentUser, updateAuthStatus } = useContext(AuthContext)

  const signUp = useCallback(
    async (data: {
      name: string
      email: string
      password: string
      passwordConfirmation: string
    }) => {
      await authService.signup(data)
      await updateAuthStatus()
    },
    [updateAuthStatus],
  )

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      await authService.login(data)
      await updateAuthStatus()
    },
    [updateAuthStatus],
  )

  const logout = useCallback(async () => {
    await authService.logout()
    await updateAuthStatus()
  }, [updateAuthStatus])

  return {
    signUp,
    login,
    logout,
    isLogin,
    currentUser,
  }
}
