import React from 'react'
import { COLORS } from '@cookup/constant'
import { CustomTextField } from '@cookup/components'
import { Box, Button, Grid, Typography } from '@mui/material'

interface PasswordUIProps {
  isValid?: boolean
}

export const PasswordUI = (props: PasswordUIProps) => {
  const { isValid } = props || {}

  return (
    <Grid item width={{ md: 464, xs: 300 }}>
      <Typography
        mt={4}
        variant="h5"
        fontWeight={500}
        textAlign="justify"
        fontFamily="Poppins"
        color={COLORS.grey.light}
      >
        * If you require a new login to Cook Up Admin panel, please update the
        email address below.
      </Typography>
      <Typography variant="h5" fontFamily="Poppins" mt={5}>
        Current Password
      </Typography>
      <Box mt={2}>
        <CustomTextField
          fullWidth
          type="password"
          name="password"
          className="settings-input"
          placeholder="Current Password"
        />
      </Box>
      <Typography variant="h5" fontFamily="Poppins" mt={5}>
        New Password
      </Typography>
      <Box mt={2}>
        <CustomTextField
          fullWidth
          type="password"
          name="new_password"
          className="settings-input"
          placeholder="New Password"
        />
      </Box>
      <Box mt={2}>
        <CustomTextField
          fullWidth
          type="password"
          name="confirmPassword"
          className="settings-input"
          placeholder="Confirm Password"
        />
      </Box>
      {isValid && (
        <Typography variant="h5" fontFamily="Poppins" mt={5} color="error">
          The password you entered is incorrect. Please try again.
        </Typography>
      )}
      <Box textAlign="center" mt={2}>
        <Button
          type="submit"
          disabled={!isValid}
          sx={{
            fontSize: 16,
            fontWeight: 600,
            borderRadius: '38px',
            color: isValid ? COLORS.white : COLORS.grey.main,
            bgcolor: isValid ? COLORS.wine.main : COLORS.grey.dark,
          }}
        >
          Update
        </Button>
      </Box>
    </Grid>
  )
}

export default PasswordUI
