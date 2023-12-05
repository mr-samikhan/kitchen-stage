import React from 'react'
import { ROUTES } from '@muc/constant'
import {
  Admins,
  Ads,
  CustomerSupport,
  Dashboard,
  Login,
  Users,
} from '@muc/screens'
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
        <Route path={ROUTES.ADS} element={<Ads />} />
        <Route path={ROUTES.USERS} element={<Users />} />
        <Route path={ROUTES.ADMINS} element={<Admins />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.CUSTOMER_SUPPORT} element={<CustomerSupport />} />
      </ReactRoutes>
      {/* </ProtectedRoute> */}
    </React.Fragment>
  )
}

export default Routes
