import React from 'react'
import { useSelector } from 'react-redux'
import { ROUTES } from '@cookup/constant'
import { ProtectedRoute } from './components/components'
import { Route, Routes as ReactRoutes } from 'react-router-dom'
import {
  Ads,
  Login,
  Users,
  Admins,
  Groups,
  Editors,
  Bookings,
  Dashboard,
  CreateAds,
  SingleUser,
  DashboardAds,
  ManageSettings,
  CustomerSupport,
} from '@cookup/screens'

const Routes = () => {
  const { isAuthenticated, isLoading } = useSelector((state: any) => state.auth)
  return (
    <React.Fragment>
      <ReactRoutes>
        <Route path={ROUTES.LOGIN_ACCOUNT} element={<Login />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<Login />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<Login />} />
      </ReactRoutes>

      <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
        <ReactRoutes>
          <Route path={ROUTES.ADS} element={<Ads />} />

          <Route path={ROUTES.USERS}>
            <Route path={ROUTES.USERS} element={<Users />} />
            <Route path={ROUTES.SINGLE_USER} element={<SingleUser />} />
          </Route>
          <Route path={ROUTES.ADMINS} element={<Admins />} />
          <Route path={ROUTES.GROUPS} element={<Groups />} />
          <Route path={ROUTES.EDIT} element={<Editors />} />
          <Route path={ROUTES.ROOT} element={<Dashboard />} />
          <Route path={ROUTES.BOOKINGS} element={<Bookings />} />
          <Route path={ROUTES.ANALYTICS} element={<Dashboard />} />
          <Route path={ROUTES.CREATE_AD} element={<CreateAds />} />
          <Route path={ROUTES.SETTINGS} element={<ManageSettings />} />
          <Route path={ROUTES.DASHBOARD_ADS} element={<DashboardAds />} />
          <Route path={ROUTES.CUSTOMER_SUPPORT} element={<CustomerSupport />} />
        </ReactRoutes>
      </ProtectedRoute>
    </React.Fragment>
  )
}

export default Routes
