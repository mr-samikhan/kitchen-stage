import React from 'react'
import { calculateAgeRange } from '@cookup/helpers'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import {
  COLORS,
  BUSINESS_USER_PROFILE_DATA,
  PERSONAL_USER_PROFILE_DATA,
} from '@cookup/constant'
import { Api } from '@cookup/services'
import { Timestamp } from 'firebase/firestore'

interface UserProfileInfoProps {
  user?: any
  isBusinessType?: boolean
  updateUser: ({ id, data }: { id: string; data: any }) => void
}

export const UserProfileInfo = (props: UserProfileInfoProps) => {
  const { isBusinessType, user, updateUser } = props || {}

  const [isEdit, setIsEdit] = React.useState(false)
  const [userData, setUserData] = React.useState<any>({})
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  let isBusinessUser = isBusinessType
    ? BUSINESS_USER_PROFILE_DATA
    : PERSONAL_USER_PROFILE_DATA

  console.log(user, 'user')

  let userObj: any = {
    Name: `${user?.firstName} ${user?.lastName}`,
    Type: user?.type || '',
    Username: user?.email || '',
    ['Age Range']: user?.dateOfBirth || '',
    Gender: user?.gender || '',
    City: user?.city || '',
    State: user?.country || '',
    ['Zip Code']: user?.zipCode || '',
    About: user?.about || '',
  }

  const handleChange = (val: any, key: string) => {
    if (key === 'Age Range') {
      const parsedDate = new Date(val)
      const firebaseTimestamp = Timestamp.fromDate(parsedDate)
      setUserData({
        ...userData,
        [key]: firebaseTimestamp || user.dateOfBirth,
      })
    } else {
      let updatedUser = { ...userObj, [key]: val }
      // console.log('Updated user obj>>>', updatedUser)
      setUserData(updatedUser)
    }
  }

  const onUpdateUser = async () => {
    let url = ''
    if (userData?.file) {
      const imgUrl = await Api.image.uploadImage(
        userData?.file,
        `/images/userProfileImage/${userData?.file?.name}`
      )
      url = imgUrl
    }
    delete userData.file
    let uName = userData?.Name?.split(' ') || []
    updateUser({
      id: user.id,
      data: {
        city: userData.City || '',
        lastName: uName[1] || user.lastName,
        firstName: uName[0] || user.firstName,
        imageUrl: url || user?.imageUrl || '',
        gender: userData.Gender || user.gender || '',
        dateOfBirth: userData['Age Range'] || user.dateOfBirth,
      },
    })
    setIsEdit(false)
  }

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file: File | null = event.target.files && event.target.files[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      user.imageUrl = fileUrl
      setUserData({ ...userData, imageUrl: fileUrl, file: file })
    }
  }

  return (
    <React.Fragment>
      <Grid mt={4} container display="flex" justifyContent="center">
        <Grid item md={2} xs={4} px={3}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Avatar
              onClick={handleFileUpload}
              src={user?.imageUrl}
              sx={{
                width: { xs: 'auto', md: '150px' },
                height: { xs: 'auto', md: '150px' },
              }}
            />
            <input
              type="file"
              ref={fileInputRef}
              accept={'image/*'}
              style={{ display: 'none' }}
              onChange={handleFileChange}
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
                inputProps={{
                  format: 'yyyy-MM-dd',
                }}
                type={isEdit && item.key === 'Age Range' ? 'date' : 'text'}
                multiline={item.key === 'About' ? true : false}
                rows={4}
                disabled={!isEdit}
                placeholder={
                  item.key === 'Age Range'
                    ? calculateAgeRange(userObj[item.key])
                    : userObj[item.key]
                }
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
