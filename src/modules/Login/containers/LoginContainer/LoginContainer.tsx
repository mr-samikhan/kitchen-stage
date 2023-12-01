import React from 'react'
import { Box, Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import useLoginForm from '../../hooks/useLoginForm'
import { CustomTextField, Form } from '@muc/components'
import { SnackBar } from '../../components/SnackBar/SnackBar'
import { LoginForm } from '../../components/LoginForm/LoginForm'
import { BrandImage } from '../../components/BrandImage/BrandImage'

export const LoginContainer = () => {
  const {
    methods,
    onSubmit,
    isError,
    pathname,
    isSnackBar,
    setIsSnackBar,
    onForgotPassword,
  } = useLoginForm()

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          bgcolor="#F7F7F7"
        >
          <Grid container justifyContent="center">
            <Grid item md={12} mb={2} xs={12} sm={10}>
              <Box textAlign="center">
                <BrandImage />
              </Box>
            </Grid>
            <LoginForm
              pathname={pathname}
              isDisable={isError}
              onForgotPassword={onForgotPassword}
            />
          </Grid>
        </Box>
        {isSnackBar && <SnackBar isOpen={isSnackBar} />}
      </Form>
    </FormProvider>
  )
}

export default LoginContainer
