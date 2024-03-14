import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputAdornment, TextField } from '@mui/material'
import { SET_SEARCH_FOCUS, onSearchChange } from '@cookup/redux'

interface MuiCustomSearchInputProps {
  placeholder?: string
}

export const MuiCustomSearchInput = (props: MuiCustomSearchInputProps) => {
  const { placeholder } = props || {}

  const dispatch = useDispatch()

  const { searchValue } = useSelector((state: any) => state.header)

  // useEffect(() => {
  //   if (searchValue !== '') {
  //     dispatch(SET_SEARCH_FOCUS(true))
  //     setTimeout(() => {
  //       dispatch(SET_SEARCH_FOCUS(false))
  //     }, 500)
  //   } else if (searchValue === '') {
  //     setTimeout(() => {
  //       dispatch(SET_SEARCH_FOCUS(false))
  //     }, 500)
  //   }
  // }, [searchValue])

  return (
    <React.Fragment>
      <TextField
        // onBlur={() => dispatch(SET_SEARCH_FOCUS(true))}
        // onFocus={() => dispatch(SET_SEARCH_FOCUS(false))}
        onChange={(e) => dispatch(onSearchChange(e.target.value))}
        variant="outlined"
        placeholder={placeholder || 'Search Users'}
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
