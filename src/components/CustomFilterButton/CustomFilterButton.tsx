import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { IconButton, InputAdornment, TextField } from '@mui/material'

interface CustomFilterButtonProps {
  value?: string
  className?: string
  placeholder?: string
  onClick?: () => void
}

export const CustomFilterButton = (props: CustomFilterButtonProps) => {
  const { placeholder, onClick, className, value } = props || {}

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
              <ExpandMoreIcon color="primary" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default CustomFilterButton
