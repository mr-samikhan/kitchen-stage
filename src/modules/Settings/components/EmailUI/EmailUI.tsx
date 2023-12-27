import React from 'react'
import { COLORS } from '@cookup/constant'
import { CustomTextField } from '@cookup/components'
import { Box, Button, Grid, Typography } from '@mui/material'

interface EmailUIProps {
  isValid?: boolean
}

export const EmailUI = (props: EmailUIProps) => {
  const { isValid } = props || {}

  return (
    <Grid item width={{ md: 380, xs: 300 }}>
      <Typography
        mt={10}
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
        Email Address
      </Typography>
      <Box mt={2}>
        <CustomTextField
          name="email"
          fullWidth
          className="settings-input"
          placeholder="heather@cookup.com"
        />
      </Box>
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

export default EmailUI
