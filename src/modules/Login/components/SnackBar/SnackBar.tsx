import React from 'react'
import { useSelector } from 'react-redux'
import { selectError } from '@cookup/redux'
import { getErrorMessage } from '@cookup/constant'
import { Box, Paper, Typography } from '@mui/material'

interface snackBarProps {
  isOpen?: boolean
}

export const SnackBar = (props: snackBarProps) => {
  const { isOpen } = props || {}

  const error = useSelector(selectError)
  const errorMsg = getErrorMessage(error)

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
            {errorMsg}
          </Typography>
        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default SnackBar
