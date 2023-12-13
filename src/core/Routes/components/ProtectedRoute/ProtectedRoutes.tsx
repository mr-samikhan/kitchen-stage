import { ROUTES } from '@cookup/constant'
import React, { useEffect, useLayoutEffect } from 'react'

import { useNavigate } from 'react-router-dom'

interface ProtectedRoutesProps {
  isAuthenticated?: boolean
  isLoading?: boolean
  children: React.ReactNode
}

const ProtectedRoutes = ({ children, ...props }: ProtectedRoutesProps) => {
  const { isAuthenticated, isLoading } = props || {}

  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD)
    } else {
      navigate(ROUTES.LOGIN_ACCOUNT)
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [])

  return isLoading ? (
    'LOADING...'
  ) : isAuthenticated ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <></>
  )
}

export default ProtectedRoutes
