import React from 'react'
import { Box, Typography } from '@mui/material';
import { Route, Routes as ReactRoutes } from "react-router-dom";

import { ROUTES } from '@muc/constant';
import { ProtectedRoute } from './components/components';

const Routes = () => {
    
  return (
  <React.Fragment>
   <ReactRoutes>
    <Route path={ROUTES.LOGIN_ACCOUNT} element={<h2>Login</h2>} />
   </ReactRoutes>

   <ProtectedRoute isAuthenticated={false}>
    <ReactRoutes>
    <Route path={ROUTES.DASHBOARD}  element={<Box bgcolor="primary.main">
      <Typography>HOME</Typography>
    </Box>} />
    </ReactRoutes>
   </ProtectedRoute>
   
  </React.Fragment>
  )
}

export default Routes