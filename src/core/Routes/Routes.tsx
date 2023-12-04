import React from 'react'
import { ROUTES } from '@muc/constant'
import { Dashboard, Login } from '@muc/screens'
import { ProtectedRoute } from './components/components'
import { Route, Routes as ReactRoutes } from 'react-router-dom'

const Routes = () => {
  return (
    <React.Fragment>
      <ReactRoutes>
        <Route path={ROUTES.LOGIN_ACCOUNT} element={<Login />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<Login />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<Login />} />
      </ReactRoutes>

      {/* <ProtectedRoute isAuthenticated={false}> */}
      <ReactRoutes>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      </ReactRoutes>
      {/* </ProtectedRoute> */}
    </React.Fragment>
  )
}

export default Routes
