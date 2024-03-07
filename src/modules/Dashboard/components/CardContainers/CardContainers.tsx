import React from 'react'
import { COLORS } from '@cookup/constant'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { DashboardCard } from '../../components/components'
import { CustomLoader } from '@cookup/components'

interface CardContainersProps {
  data?: any
  title?: string
  titleColor?: string
  isLoading?: boolean
}

export const CardContainers = (props: CardContainersProps) => {
  const { data, title, titleColor, isLoading } = props || {}

  return (
    <>
      <Typography fontSize={20} color={COLORS.black}>
        {title}
      </Typography>

      <Grid container spacing={3} mt={1} p={{ xs: 2, md: 0 }}>
        {data?.map((item: any) => (
          <Grid item md={2.8} xs={6}>
            <DashboardCard
              type={item.type}
              title={item.title}
              isLoading={isLoading}
              titleColor={titleColor}
              duration={item.duration}
              navigate={item.navigate}
              percentage={item.percentage}
              counterWithText={item.counterWithText}
              counter={isLoading ? 'Loading...' : item.counter}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CardContainers
