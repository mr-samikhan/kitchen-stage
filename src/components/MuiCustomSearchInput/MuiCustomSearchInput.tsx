import React from 'react'
import { useDispatch } from 'react-redux'
import { SET_SEARCH_FOCUS } from '@cookup/redux'
import { InputAdornment, TextField } from '@mui/material'

export const MuiCustomSearchInput = () => {
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <TextField
        onFocus={() => dispatch(SET_SEARCH_FOCUS(false))}
        onBlur={() => dispatch(SET_SEARCH_FOCUS(true))}
        variant="outlined"
        placeholder="Search Users"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src="/assets/icons/search.svg" alt="search-icon" />
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
