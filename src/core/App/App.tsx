import { useEffect } from 'react'
import { Routes } from '@cookup/core'
import { auth } from '@cookup/firebase'
import { ROUTES } from '@cookup/constant'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@cookup/providers'
import { CustomLoader } from '@cookup/components'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT, getCurrentUserData } from '@cookup/redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'

const App = () => {
  const dispath = useDispatch<any>()
  const queryClient = new QueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { userLoading } = useSelector((state: any) => state.auth)

  let oobCode: string | null = searchParams.get('oobCode')
  console.log('>>>oobCode', oobCode)

  useEffect(() => {
    if (oobCode) {
      navigate(ROUTES.RESET_PASSWORD, { state: { oobCode } })
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          dispath(
            getCurrentUserData({
              uid: user.uid,
              email: user.email,
              role: '',
              userName: user.displayName,
            })
          )
        } else {
          dispath(LOGOUT())
          navigate(ROUTES.LOGIN_ACCOUNT)
        }
      })

      return unsubscribe
    }
  }, [dispath, auth])

  if (userLoading === 'pending') {
    return <CustomLoader />
  }

  // //reset screen
  // if (oobCode) {
  //   navigate(ROUTES.RESET_PASSWORD)
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
