import React from 'react'
import { calculateAgeRange } from '@cookup/helpers'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import {
  COLORS,
  BUSINESS_USER_PROFILE_DATA,
  PERSONAL_USER_PROFILE_DATA,
} from '@cookup/constant'

interface UserProfileInfoProps {
  user?: any
  isBusinessType?: boolean
}

export const UserProfileInfo = (props: UserProfileInfoProps) => {
  const { isBusinessType, user } = props || {}

  let isBusinessUser = isBusinessType
    ? BUSINESS_USER_PROFILE_DATA
    : PERSONAL_USER_PROFILE_DATA

  console.log(user, 'user')

  const userObj: any = {
    Name: `${user?.firstName} ${user?.lastName}`,
    Type: user?.type,
    Username: user?.email,
    ['Age Range']: calculateAgeRange(user?.dateOfBirth || ''),
    Gender: user?.gender,
    City: user?.city,
    State: user?.country,
    ['Zip Code']: user?.zipCode,
    About: user?.about,
  }

  return (
    <React.Fragment>
      <Grid mt={4} container display="flex" justifyContent="center">
        <Grid item md={2} xs={4} px={3}>
          <Avatar
            src={user?.imageUrl}
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
                {userObj[item.key]}
                {/* {item.value} */}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default UserProfileInfo
