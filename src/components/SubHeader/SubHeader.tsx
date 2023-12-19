import React from 'react'
import { Box } from '@mui/material'
import { CustomFilterButton } from '@cookup/components'

export const SubHeader = () => {
  return (
    <Box display="flex" gap={2} justifyContent="flex-end">
      <CustomFilterButton />
      <CustomFilterButton
        placeholder="Filter"
        icon="/assets/icons/filter_alt.svg"
      />
    </Box>
  )
}

export default SubHeader
