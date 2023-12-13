import React from 'react'
import { COLORS } from '@cookup/constant'
import { Grid, Typography } from '@mui/material'
import { DashboardCard } from '../../components/components'

interface CardContainersProps {
  data?: any
  title?: string
  titleColor?: string
}

export const CardContainers = (props: CardContainersProps) => {
  const { data, title, titleColor } = props || {}
  return (
    <>
      <Typography fontSize={20} color={COLORS.black}>
        {title}
      </Typography>
      <Grid container spacing={3} mt={1} p={{ xs: 2, md: 0 }}>
        {data?.map((item: any) => (
          <Grid item md={2.8} xs={6}>
            <DashboardCard
              title={item.title}
              counter={item.counter}
              titleColor={titleColor}
              duration={item.duration}
              navigate={item.navigate}
              percentage={item.percentage}
              counterWithText={item.counterWithText}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CardContainers
