import React from 'react'
import { CircularProgress, Grid } from '@mui/material'

export const CustomLoader = () => {
  return (
    <Grid
      container
      maxHeight="100vh"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Grid>
  )
}

export default CustomLoader
