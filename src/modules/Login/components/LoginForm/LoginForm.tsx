import React from 'react'
import { COLORS, ROUTES } from '@muc/constant'
import { CustomTextField } from '@muc/components'
import { Box, Grid, IconButton, Link, Typography } from '@mui/material'

interface LoginFormProps {
  pathname?: string
  isDisable?: boolean
  onForgotPassword?: void | any
}

export const LoginForm = (props: LoginFormProps) => {
  const { isDisable, onForgotPassword, pathname } = props || {}

  let PATH_CHECK = pathname === ROUTES.FORGOT_PASSWORD

  return (
    <React.Fragment>
      <Grid item md={5} sm={10} xs={10}>
        <Box mb={2}>
          <Typography
            variant="body1"
            textAlign="start"
            color={COLORS.input.main}
          >
            EMAIL ADDRESS
          </Typography>
        </Box>
        <CustomTextField
          fullWidth
          name="email"
          className="auth"
          placeholder="example@email.com"
        />
        {PATH_CHECK ? null : (
          <>
            <Box mt={4}>
              <Box mb={2}>
                <Typography
                  variant="body1"
                  textAlign="start"
                  color={COLORS.input.main}
                >
                  PASSWORD
                </Typography>
              </Box>
              <CustomTextField
                fullWidth
                type="password"
                name="password"
                className="auth"
                placeholder="********"
              />
            </Box>
            <Box>
              <Box textAlign="end" mt={2}>
                <Link onClick={() => onForgotPassword()}>Forgot Password</Link>
              </Box>
            </Box>
          </>
        )}
      </Grid>
      <Grid item md={12} sm={10} mt={5}>
        <Box textAlign="center">
          <IconButton type="submit">
            {!isDisable ? (
              <img src="assets/icons/login-disable-btn.svg" alt="eye" />
            ) : (
              <img src="assets/icons/login-btn.svg" alt="eye" />
            )}
          </IconButton>
        </Box>
      </Grid>
    </React.Fragment>
  )
}

export default LoginForm
