import React from 'react'
import { COLORS, USER_ADS_DATA } from '@cookup/constant'
import { Avatar, Box, Grid, Typography } from '@mui/material'

interface TViewDetails {
  img?: string
  isDashboardAidUI?: boolean
}

export const ViewAdDetails = (props: TViewDetails) => {
  const { isDashboardAidUI, img } = props || {}

  let isAcive = true

  return (
    <>
      <Grid item xs={12} md={4} px={2}>
        <Avatar
          variant="rounded"
          src={img || '/assets/images/card-img.svg'}
          sx={{
            height: 400,
            width: { xs: 'auto', md: 400 },
          }}
        />
        <Box
          mt={2}
          width={260}
          height={50}
          borderRadius="7px"
          bgcolor={isAcive ? COLORS.active : COLORS.transparentOrange}
        >
          <Typography
            variant="h5"
            lineHeight="50px"
            textAlign="center"
            fontFamily={isAcive ? '' : 'Poppins'}
            color={isAcive ? COLORS.success : COLORS.secondary.main}
          >
            {isAcive ? ' Active: Day 3 of 4' : 'Expired'}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} px={2}>
        {USER_ADS_DATA.map((item, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            mt={isDashboardAidUI ? 2 : 4}
          >
            <Typography variant="h5" width={{ md: 150, xs: 100 }}>
              {item.key}
            </Typography>
            {!isDashboardAidUI && (
              <Typography
                width={300}
                variant="h5"
                color={COLORS.grey.main}
                height={index === 3 ? 156 : 'auto'}
              >
                {item.value}
              </Typography>
            )}
            {isDashboardAidUI && (
              <Typography
                p={2}
                width={300}
                variant="h5"
                display="flex"
                borderRadius="8px"
                alignItems="center"
                color={COLORS.grey.main}
                bgcolor={COLORS.grey.dark}
                height={index === 3 ? 156 : 50}
              >
                {item.value}
              </Typography>
            )}
          </Box>
        ))}
      </Grid>
    </>
  )
}

export default ViewAdDetails
