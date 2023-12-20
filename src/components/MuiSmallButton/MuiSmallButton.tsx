import React from 'react'
import { Button } from '@mui/material'

interface MuiSmallButtonProps {
  btnText?: string
  onClick?: () => void
  variant?: 'contained' | 'outlined'
}

export const MuiSmallButton = (props: MuiSmallButtonProps) => {
  const { btnText, variant, onClick } = props || {}

  let ICON_CHECK = btnText === 'Create Ad' && (
    <img src="/assets/icons/add_square.svg" alt="add_square" />
  )

  return (
    <Button
      size="small"
      onClick={onClick}
      endIcon={ICON_CHECK}
      variant={variant || 'contained'}
      sx={{
        bgcolor: 'secondary.main',
      }}
    >
      {btnText}
    </Button>
  )
}

export default MuiSmallButton
