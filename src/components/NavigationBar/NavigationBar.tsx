import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'

interface NavigationBarProps {
  navigationTitle?: string
  onGoBack?: () => void
  navTitleColor?: string
}

export const NavigationBar = (props: NavigationBarProps) => {
  const { navigationTitle, onGoBack, navTitleColor } = props || {}
  return (
    <React.Fragment>
      <Box display="flex" gap={1} alignItems="center">
        <IconButton onClick={onGoBack}>
          <img src="/assets/icons/chevron-left.svg" alt="chevron" />
        </IconButton>
        <Typography variant="h3" color={navTitleColor || 'secondary.light'}>
          {navigationTitle}
        </Typography>
      </Box>
    </React.Fragment>
  )
}

export default NavigationBar
