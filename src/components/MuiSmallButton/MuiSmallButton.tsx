import React from 'react'
import { Button } from '@mui/material'

interface MuiSmallButtonProps {
  btnText?: string
  variant?: 'contained' | 'outlined'
}

export const MuiSmallButton = (props: MuiSmallButtonProps) => {
  const { btnText, variant } = props || {}

  return (
    <Button variant={variant || 'contained'} color="error" size="small">
      {btnText}
    </Button>
  )
}

export default MuiSmallButton
