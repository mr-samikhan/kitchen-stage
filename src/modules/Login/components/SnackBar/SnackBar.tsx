import { Box, Grid, Paper, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

interface snackBarProps {
  isOpen?: boolean
}

export const SnackBar = (props: snackBarProps) => {
  const { isOpen } = props || {}

  return (
    <React.Fragment>
      <Paper
        sx={{
          top: 0,
          width: '100%',
          height: '90px',
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'secondary.light',
          background: 'secondary.light',
        }}
      >
        <Box
          width={{
            xs: '100%',
            md: '40%',
            sm: '50%',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="left"
            color="white"
          >
            Your email address and password did not match, Please check your
            {/* <br /> */}
            credentials and try again
          </Typography>
        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default SnackBar
