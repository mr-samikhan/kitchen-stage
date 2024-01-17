import { useEffect } from 'react'
import { Routes } from '@cookup/core'
import { auth } from '@cookup/firebase'
import { ROUTES } from '@cookup/constant'
import { CssBaseline } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@cookup/providers'
import { CustomLoader } from '@cookup/components'
import { useDispatch, useSelector } from 'react-redux'
import {
  LOGOUT,
  SET_LOADING,
  UPDATE_USER,
  SET_AUTHENTICATED,
} from '@cookup/redux'

const App = () => {
  const dispath = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state: any) => state.auth)

  useEffect(() => {
    dispath(SET_LOADING(true))
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispath(SET_AUTHENTICATED())
        dispath(
          UPDATE_USER({
            userName: user.displayName || '',
            email: user.email || '',
          })
        )
        dispath(SET_LOADING(false))
      } else {
        dispath(LOGOUT())
        dispath(SET_LOADING(false))
        navigate(ROUTES.LOGIN_ACCOUNT)
      }
    })
  }, [dispath, auth])

  if (isLoading) {
    return <CustomLoader />
  }

  return (
    <ThemeProvider>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default App
