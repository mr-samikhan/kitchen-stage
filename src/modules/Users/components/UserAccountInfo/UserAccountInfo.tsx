import React from 'react'
import { COLORS } from '@cookup/constant'
import { useSelector } from 'react-redux'
import { CustomTextField } from '@cookup/components'
import { Box, Button, Grid, Typography } from '@mui/material'

interface UserAccountInfoProps {
  isValid?: boolean
  onUpdateUser?: () => void
}

export const UserAccountInfo = (props: UserAccountInfoProps) => {
  const { isValid, onUpdateUser } = props || {}

  const { isPasswordSent } = useSelector((state: any) => state.user)

  return (
    <React.Fragment>
      <Grid item container justifyContent="center" mt={8}>
        <Grid item md={4} xs={10}>
          <Typography variant="subtitle2" fontWeight={600} color="primary">
            Email Address
          </Typography>
          <Box mt={2}>
            <CustomTextField name="email" placeholder="" fullWidth />
          </Box>
          <Grid item md={10} xs={12} m="auto" mt={2}>
            <Button
              type="submit"
              fullWidth
              color="primary"
              disabled={isPasswordSent || !isValid}
              variant="contained"
              sx={{ borderRadius: '38px', p: '15px 20px' }}
            >
              Send Password Reset Email
            </Button>
          </Grid>

          {isValid && isPasswordSent && (
            <Grid item xs={12} m="auto" mt={4}>
              <Typography
                mt={4}
                fontWeight={600}
                variant="subtitle1"
                color={COLORS.success}
              >
                * You have successfully sent the password reset email to this
                user
              </Typography>
            </Grid>
          )}
          <Grid item md={5} xs={12} m="auto" mt={4}>
            <Button
              color="primary"
              variant="contained"
              onClick={onUpdateUser}
              disabled={!isPasswordSent}
              sx={{ borderRadius: '38px', p: '15px 20px' }}
            >
              Update Info
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default UserAccountInfo
