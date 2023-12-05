import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'

interface HeaderProps {
  title?: string
}

export const Header = (props: HeaderProps) => {
  const { title } = props || {}
  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={4} p={4}></Grid>
        <Grid item md={4} p={4}>
          <Typography variant="h1" textAlign="left">
            {title}
          </Typography>
        </Grid>
        <Grid item md={4} p={4}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary">
              Add New Admin
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Header
