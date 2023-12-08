import React from 'react'
import { InputAdornment, TextField } from '@mui/material'

export const MuiCustomSearchInput = () => {
  return (
    <React.Fragment>
      <TextField
        variant="outlined"
        placeholder="Search Users"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src="assets/icons/search.svg" alt="search-icon" />
            </InputAdornment>
          ),
        }}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '33px',
          },
        }}
      />
    </React.Fragment>
  )
}

export default MuiCustomSearchInput
