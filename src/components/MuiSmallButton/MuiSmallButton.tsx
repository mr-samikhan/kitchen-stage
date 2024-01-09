import React from 'react'
import { Button } from '@mui/material'

interface MuiSmallButtonProps {
  sx?: any
  type?: any
  icon?: string
  btnText?: string
  className?: string
  onClick?: () => void
  size?: 'small' | 'large' | 'medium'
  variant?: 'contained' | 'outlined'
}

export const MuiSmallButton = (props: MuiSmallButtonProps) => {
  const { btnText, variant, onClick, icon, type, sx, className, size } =
    props || {}

  let ICON_CHECK = btnText === 'Create Ad' && (
    <img src="/assets/icons/add_square.svg" alt="add_square" />
  )

  return (
    <Button
      type={type}
      onClick={onClick}
      className={className}
      size={size ? size : 'small'}
      variant={variant ? variant : 'contained'}
      endIcon={<img src={icon} alt="" /> || ICON_CHECK}
      sx={
        sx || {
          bgcolor: 'secondary.main',
        }
      }
    >
      {btnText}
    </Button>
  )
}

export default MuiSmallButton
