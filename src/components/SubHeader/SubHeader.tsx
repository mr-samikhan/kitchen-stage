import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { CustomFilterButton } from '@cookup/components'
import { OPEN_SORT_MODAL, SET_FILTER_MODAL } from '@cookup/redux'

interface SubHeaderProps {
  isSort: boolean
  isFilter: boolean
}

export const SubHeader = (props: SubHeaderProps) => {
  const { isSort, isFilter } = props || {}

  const dispatch = useDispatch()

  return (
    <Box display="flex" gap={2} justifyContent="flex-end">
      {isSort && (
        <CustomFilterButton onClick={() => dispatch(OPEN_SORT_MODAL())} />
      )}
      {isFilter && (
        <CustomFilterButton
          placeholder="Filter"
          icon="/assets/icons/filter_alt.svg"
          onClick={() => dispatch(SET_FILTER_MODAL(true))}
        />
      )}
    </Box>
  )
}

export default SubHeader
