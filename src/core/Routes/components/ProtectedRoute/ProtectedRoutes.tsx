import { ROUTES } from '@cookup/constant'
import React, { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtectedRoutesProps {
  isLoading?: boolean
  isAuthenticated?: boolean
  children: React.ReactNode
}

const ProtectedRoutes = ({ children, ...props }: ProtectedRoutesProps) => {
  const { isAuthenticated, isLoading } = props || {}

  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)

  useLayoutEffect(() => {
    if (queryParams.get('mode') === 'resetPassword') {
      navigate(ROUTES.RESET_PASSWORD)
    } else if (isAuthenticated) {
      navigate(ROUTES.ROOT)
    } else {
      console.log('protected route')
      navigate(ROUTES.LOGIN_ACCOUNT)
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  return isAuthenticated ? <React.Fragment>{children}</React.Fragment> : <></>
}

export default ProtectedRoutes
