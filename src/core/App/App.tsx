import { useEffect } from 'react'
import { Routes } from '@cookup/core'
import { auth } from '@cookup/firebase'
import { ROUTES } from '@cookup/constant'
import { CssBaseline } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@cookup/providers'
import { CustomLoader } from '@cookup/components'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT, getCurrentUserData } from '@cookup/redux'

const App = () => {
  const dispath = useDispatch<any>()
  const navigate = useNavigate()
  const { userLoading } = useSelector((state: any) => state.auth)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispath(
          getCurrentUserData({
            uid: user.uid,
            email: user.email,
            type: '',
            userName: user.displayName,
          })
        )
      } else {
        dispath(LOGOUT())
        navigate(ROUTES.LOGIN_ACCOUNT)
      }
    })

    return unsubscribe
  }, [dispath, auth])

  if (userLoading === 'pending') {
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
