import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { IconButton, InputAdornment, TextField } from '@mui/material'

interface CustomFilterButtonProps {
  icon?: string
  value?: string
  className?: string
  placeholder?: string
  onClick?: () => void
}

export const CustomFilterButton = (props: CustomFilterButtonProps) => {
  const { placeholder, onClick, className, value, icon } = props || {}

  return (
    <TextField
      variant="outlined"
      className={className || 'filter'}
      placeholder={placeholder || 'Today'}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" onClick={onClick}>
            <IconButton>
              {icon ? (
                <img src={icon} alt="" />
              ) : (
                <ExpandMoreIcon color="primary" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default CustomFilterButton
