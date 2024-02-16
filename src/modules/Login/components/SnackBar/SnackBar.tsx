import React from 'react'
import { useSelector } from 'react-redux'
import { selectError } from '@cookup/redux'
import { getErrorMessage } from '@cookup/constant'
import { Box, Paper, Typography } from '@mui/material'

interface snackBarProps {
  isOpen?: boolean
  bgcolor?: string
  errorMessage?: string
}

export const SnackBar = (props: snackBarProps) => {
  const { isOpen, errorMessage, bgcolor } = props || {}

  const error = useSelector(selectError)
  const errorMsg = getErrorMessage(error ? error : '')

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
          bgcolor: bgcolor ? bgcolor : 'secondary.light',
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
            color="white"
            fontWeight={500}
            textAlign="center"
          >
            {errorMessage || errorMsg}
          </Typography>
        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default SnackBar
