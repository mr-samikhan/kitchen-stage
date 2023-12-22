import React from 'react'
import { COLORS, USER_ADS_DATA } from '@cookup/constant'
import { Avatar, Box, Grid, Typography } from '@mui/material'

export const ViewAdDetails = () => {
  let isAcive = true
  return (
    <>
      <Grid item xs={12} md={4} px={2}>
        <Avatar
          variant="rounded"
          src="/assets/images/card-img.svg"
          sx={{
            height: 400,
            width: { xs: 'auto', md: 400 },
          }}
        />
        <Box
          width={260}
          height={50}
          borderRadius="7px"
          bgcolor={isAcive ? COLORS.active : COLORS.transparentOrange}
          mt={2}
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
          <Box mt={4} key={index} display="flex" justifyContent="flex-start">
            <Typography variant="h5" width={{ md: 150, xs: 100 }}>
              {item.key}
            </Typography>
            <Typography
              width={300}
              variant="h5"
              color={COLORS.grey.main}
              height={index === 3 ? 156 : 'auto'}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Grid>
    </>
  )
}

export default ViewAdDetails
