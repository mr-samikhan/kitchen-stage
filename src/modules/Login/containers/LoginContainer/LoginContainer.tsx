import { Box, Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import useLoginForm from '../../hooks/useLoginForm'
import { CustomDialog, Form } from '@cookup/components'
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
    isPasswordSent,
    onResetSuccess,
    onForgotPassword,
    onResetPassword,
    setIsPasswordSent,
    isPasswordResetModal,
    setIsPasswordResetModal,
  } = useLoginForm()

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box height="100vh" display="flex" alignItems="center">
          <Grid container justifyContent="center">
            <Grid item md={12} mb={2} xs={12} sm={10}>
              <Box textAlign="center">
                <BrandImage />
              </Box>
            </Grid>
            <LoginForm
              pathname={pathname}
              isDisable={isError}
              isError={isSnackBar}
              onForgotPassword={onForgotPassword}
            />
          </Grid>
        </Box>
        {isSnackBar && <SnackBar isOpen={isSnackBar} />}
        {isPasswordSent && (
          <CustomDialog
            isOkButton
            okButtonText="Okay"
            isOpen={isPasswordSent}
            setOpen={setIsPasswordSent}
            onConfirm={onResetPassword}
            icon="/assets/icons/mail.svg"
            title="Email Sucessfully Sent"
            onClose={() => setIsPasswordSent(false)}
            subTitle="Check your email to reset your password"
          />
        )}
        {isPasswordResetModal && (
          <CustomDialog
            isOkButton
            okButtonText="Okay"
            onConfirm={onResetSuccess}
            isOpen={isPasswordResetModal}
            icon="/assets/icons/ok-icon.svg"
            setOpen={setIsPasswordResetModal}
            title="Your password has been changed"
            onClose={() => setIsPasswordResetModal(false)}
          />
        )}
      </Form>
    </FormProvider>
  )
}

export default LoginContainer
