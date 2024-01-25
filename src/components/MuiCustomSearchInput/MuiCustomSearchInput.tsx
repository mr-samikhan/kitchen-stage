import React from 'react'
import { useDispatch } from 'react-redux'
import { InputAdornment, TextField } from '@mui/material'
import { SET_SEARCH_FOCUS, onSearchChange } from '@cookup/redux'

export const MuiCustomSearchInput = () => {
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <TextField
        onBlur={() => dispatch(SET_SEARCH_FOCUS(true))}
        onFocus={() => dispatch(SET_SEARCH_FOCUS(false))}
        onChange={(e) => dispatch(onSearchChange(e.target.value))}
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
