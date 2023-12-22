import React from 'react'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import {
  COLORS,
  BUSINESS_USER_PROFILE_DATA,
  PERSONAL_USER_PROFILE_DATA,
} from '@cookup/constant'

interface UserProfileInfoProps {
  isBusinessType?: boolean
}

export const UserProfileInfo = (props: UserProfileInfoProps) => {
  const { isBusinessType } = props || {}

  let isBusinessUser = isBusinessType
    ? BUSINESS_USER_PROFILE_DATA
    : PERSONAL_USER_PROFILE_DATA
  return (
    <React.Fragment>
      <Grid mt={4} container display="flex" justifyContent="center">
        <Grid item md={2} xs={4} px={3}>
          <Avatar
            src="/assets/images/profile-image.svg"
            sx={{
              width: { xs: 'auto', md: '150px' },
              height: { xs: 'auto', md: '150px' },
            }}
          />
        </Grid>
        <Grid item md={4} xs={8} px={3}>
          {isBusinessUser.map((item, index) => (
            <Box
              display="flex"
              mt={index === 0 ? 0 : 4}
              justifyContent="flex-start"
            >
              <Typography variant="h5" width={{ md: 150, xs: 100 }}>
                {item.key}
              </Typography>
              <Typography variant="h5" color={COLORS.grey.main}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default UserProfileInfo
