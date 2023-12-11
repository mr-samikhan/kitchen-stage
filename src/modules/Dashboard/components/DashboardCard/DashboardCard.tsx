import React from 'react'
import { COLORS } from '@muc/constant'
import { useBreakpints } from '@muc/hooks'
import { useNavigate } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, IconButton, Paper, Typography } from '@mui/material'

interface DashboardCardProps {
  title?: string
  counter?: number
  duration?: string
  titleColor?: string
  percentage?: string | number
  navigate?: string | undefined
  counterWithText?: string | number
}

export const DashboardCard = (props: DashboardCardProps) => {
  const {
    title,
    counter,
    navigate,
    duration,
    titleColor,
    percentage,
    counterWithText,
  } = props || {}

  const navigatTo = useNavigate()

  const { mobileMode } = useBreakpints()

  return (
    <Paper className="dashboard_card" elevation={0}>
      <Box p={2}>
        <Box
          display="flex"
          alignItems="center"
          position="relative"
          justifyContent="center"
        >
          <Typography variant="h5" color={titleColor}>
            {title}
          </Typography>
          {navigate !== undefined && (
            <Box position={mobileMode ? 'relative' : 'absolute'} right={0}>
              <IconButton onClick={() => navigatTo(navigate)}>
                <ChevronRightIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Typography
          fontSize={32}
          fontWeight={700}
          textAlign="center"
          color="secondary.light"
        >
          {counter}
        </Typography>
        {percentage === undefined ? (
          <Typography
            variant="h6"
            display="flex"
            textAlign="center"
            justifyContent="center"
          >
            {`${counterWithText} users were added`}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            display="flex"
            textAlign="center"
            justifyContent="center"
            color={COLORS.success}
          >
            {`${percentage}%`}
            <Typography
              textAlign="center"
              variant="h6"
              ml={0.2}
              color="primary"
            >
              vs {duration}
            </Typography>
          </Typography>
        )}
      </Box>
    </Paper>
  )
}

export default DashboardCard
