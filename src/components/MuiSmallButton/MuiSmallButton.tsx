import React from 'react'
import { Button } from '@mui/material'

interface MuiSmallButtonProps {
  btnText?: string
  variant?: 'contained' | 'outlined'
}

export const MuiSmallButton = (props: MuiSmallButtonProps) => {
  const { btnText, variant } = props || {}

  let ICON_CHECK = btnText === 'Create Ad' && (
    <img src="assets/icons/add_square.svg" alt="add_square" />
  )

  return (
    <Button
      color="error"
      size="small"
      endIcon={ICON_CHECK}
      variant={variant || 'contained'}
    >
      {btnText}
    </Button>
  )
}

export default MuiSmallButton
