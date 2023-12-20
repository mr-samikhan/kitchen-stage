import React from 'react'
import { IconButton, InputAdornment, MenuItem, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface CustomTextFieldProps {
  sx?: any
  name: string
  options?: any
  icon?: string
  select?: boolean
  disabled?: boolean
  fullWidth?: boolean
  multiline?: boolean
  className?: string
  placeholder?: string
  defaultValue?: string | number
  type?: 'text' | 'number' | 'password'
}
export const CustomTextField = (props: CustomTextFieldProps) => {
  const { name, className, defaultValue, options, select, icon } = props || {}

  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <React.Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({ field }) => (
          <TextField
            {...props}
            {...field}
            className={className}
            error={!!errors[name]}
            sx={{
              ...inputStyle,
              textAlign: 'left',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {icon && (
                    <IconButton>
                      <img src={icon || '/assets/icons/check.svg'} alt="eye" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            helperText={errors[name] ? <>{errors[name]?.message}</> : ''}
          >
            {select &&
              options.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </TextField>
        )}
      />
    </React.Fragment>
  )
}

export default CustomTextField
const inputStyle = {
  '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
    {
      '-webkit-appearance': 'none',
      margin: 0,
    },
}
