import React from 'react'
import { COLORS, ROUTES } from '@cookup/constant'
import { CustomTextField } from '@cookup/components'
import { Box, Grid, IconButton, Link, Typography } from '@mui/material'

interface LoginFormProps {
  pathname?: string
  isError?: boolean
  isDisable?: boolean
  onForgotPassword?: void | any
}

export const LoginForm = (props: LoginFormProps) => {
  const { isDisable, onForgotPassword, pathname, isError } = props || {}

  let PATH_CHECK = pathname === ROUTES.FORGOT_PASSWORD
  let RESET_PATH_CHECK = pathname === ROUTES.RESET_PASSWORD

  return (
    <React.Fragment>
      <Grid item md={5} sm={10} xs={10}>
        {RESET_PATH_CHECK ? null : (
          <>
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
          </>
        )}
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
                icon={isError ? 'assets/icons/login-error.svg' : ''}
              />
            </Box>
            {!RESET_PATH_CHECK && (
              <Box>
                <Box textAlign="end" mt={2}>
                  <Link onClick={() => onForgotPassword()}>
                    Forgot Password
                  </Link>
                </Box>
              </Box>
            )}
          </>
        )}
        {RESET_PATH_CHECK ? (
          <Box mt={4}>
            <Box mb={2}>
              <Typography
                variant="body1"
                textAlign="start"
                color={COLORS.input.main}
              >
                CONFIRM PASSWORD
              </Typography>
            </Box>
            <CustomTextField
              fullWidth
              type="password"
              className="auth"
              name="confirmPassword"
              placeholder="********"
              icon={isError ? 'assets/icons/login-error.svg' : ''}
            />
          </Box>
        ) : null}
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
