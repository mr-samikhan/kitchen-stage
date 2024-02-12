import React from 'react'
import { calculateAgeRange } from '@cookup/helpers'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
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

  const [isEdit, setIsEdit] = React.useState(false)
  const [userData, setUserData] = React.useState({})

  let isBusinessUser = isBusinessType
    ? BUSINESS_USER_PROFILE_DATA
    : PERSONAL_USER_PROFILE_DATA

  console.log(user, 'user')

  let userObj: any = {
    Name: `${user?.firstName} ${user?.lastName}`,
    Type: user?.type || '',
    Username: user?.email || '',
    ['Age Range']: calculateAgeRange(user?.dateOfBirth || ''),
    Gender: user?.gender || '',
    City: user?.city || '',
    State: user?.country || '',
    ['Zip Code']: user?.zipCode || '',
    About: user?.about || '',
  }

  const handleChange = (val: any, key: string) => {
    let updatedUser = { ...userObj, [key]: val }
    console.log('Updated user obj>>>', updatedUser)
    setUserData(updatedUser)
  }

  const onUpdateUser = () => {
    console.log('User updated')
    setIsEdit(false)
  }

  return (
    <React.Fragment>
      <Grid mt={4} container display="flex" justifyContent="center">
        <Grid item md={2} xs={4} px={3}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Avatar
              src={user?.imageUrl}
              sx={{
                width: { xs: 'auto', md: '150px' },
                height: { xs: 'auto', md: '150px' },
              }}
            />
            <Button
              variant="outlined"
              sx={{
                mt: 1,
                height: 20,
                width: 180,
                fontSize: 12,
                borderRadius: '3px',
              }}
              onClick={() => (isEdit ? onUpdateUser() : setIsEdit(!isEdit))}
            >
              {isEdit ? 'Save' : 'Edit Profile'}
            </Button>
          </Box>
        </Grid>
        <Grid item md={4} xs={8} px={3}>
          {isBusinessUser.map((item, index) => (
            <Box
              display="flex"
              alignItems="center"
              mt={index === 0 ? 0 : 4}
              justifyContent="flex-start"
            >
              <Typography variant="h5" width={{ md: 150, xs: 100 }}>
                {item.key}
              </Typography>
              {/* <Typography variant="h5" color={COLORS.grey.main}>
                {userObj[item.key]} */}
              {/* {item.value} */}
              {/* </Typography> */}
              <TextField
                multiline={item.key === 'About' ? true : false}
                rows={4}
                disabled={!isEdit}
                placeholder={userObj[item.key]}
                onChange={(e) => handleChange(e.target.value, item.key)}
                sx={{
                  width: 300,
                }}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default UserProfileInfo
