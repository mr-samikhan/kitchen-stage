import React from 'react'
import { COLORS } from '@cookup/constant'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { SnackBar, useLoginForm } from '@cookup/modules'
import {
  Box,
  Grid,
  Button,
  TextField,
  IconButton,
  Typography,
} from '@mui/material'

export const Login2FAContainer = () => {
  const {
    otp,
    step,
    phone,
    setPhone,
    onSendOTP,
    onVerifyOTP,
    onOTPChange,
    phoneStatus,
    onResendOTP,
  } = useLoginForm()

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Box width={{ xs: '80%', md: 600 }}>
              <Typography
                variant="h4"
                fontWeight={700}
                color={COLORS.input.main}
              >
                Set up 2FA
              </Typography>
              <Typography
                my={2}
                variant="h4"
                fontWeight={400}
                color={COLORS.grey.main}
              >
                Input phone number to set up 2FA
              </Typography>
              <PhoneInput
                containerStyle={{
                  width: '100%',
                  height: '80px',
                  backgroundColor: '#FFFF',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  borderBottomLeftRadius: '20px',
                  borderBottomRightRadius: '20px',
                }}
                inputStyle={{
                  width: '100%',
                  height: '80px',
                  border: 'none',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#8A8887',
                  marginLeft: '50px',
                  fontFamily: 'Nunito',
                  borderRadius: '40px',
                  backgroundColor: '#FFFF',
                }}
                buttonStyle={{
                  left: '8%',
                  border: 'none',
                  height: '80px',
                  backgroundColor: '#FFFF',
                }}
                country={'us'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </Box>
            <IconButton onClick={onSendOTP}>
              <img src="/assets/icons/login-btn.svg" alt="eye" />
            </IconButton>
            <Box id="recaptcha-container"></Box>
          </>
        )
      case 1:
        return (
          <React.Fragment>
            <Box width={400}>
              <Typography variant="body2" color="primary">
                Phone Verification
              </Typography>
              <Typography my={2} variant="subtitle2" color={COLORS.grey.main}>
                Input the six digit code sent to your phone number
                (XXX-XXX-1234)
              </Typography>
              <Typography my={2} variant="subtitle2" color="primary">
                Enter six digit code
              </Typography>
              <Box my={2}>
                <TextField
                  fullWidth
                  value={otp}
                  variant="outlined"
                  placeholder="000-000"
                  onChange={onOTPChange}
                  inputProps={{
                    maxLength: 7,
                  }}
                  helperText="Enter your 6-digit OTP"
                />
              </Box>

              <Button
                onClick={onVerifyOTP}
                fullWidth
                variant="contained"
                sx={{
                  my: 2,
                  bgcolor: COLORS.secondary.main,
                  color: COLORS.white,
                }}
              >
                Verfiy
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={onResendOTP}
                sx={{
                  outline: 'none',
                  border: 'none',
                  fontSize: '16px',
                  ':hover': {
                    outline: 'none',
                    border: 'none',
                  },
                }}
              >
                Resend OTP
              </Button>
            </Box>
          </React.Fragment>
        )
    }
  }

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        alignItems={'center'}
        bgcolor={COLORS.background}
        justifyContent="space-around"
        height={step === 0 ? '100vh' : '90vh'}
      >
        <Box textAlign="center">
          <img
            alt="logo"
            width={100}
            height={100}
            src="/assets/icons/kitchen-stage.svg"
          />
        </Box>
        {renderStep()}
      </Grid>
      {(step === 0 && phoneStatus.isError) || phoneStatus.isSuccess ? (
        <SnackBar
          isOpen={true}
          errorMessage={phoneStatus.message}
          bgcolor={phoneStatus.isSuccess ? COLORS.info.main : ''}
        />
      ) : null}
    </React.Fragment>
  )
}

export default Login2FAContainer
