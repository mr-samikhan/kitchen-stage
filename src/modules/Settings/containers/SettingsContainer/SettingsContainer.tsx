import React, { useEffect } from 'react'
import { useBreakPoints } from '@cookup/hooks'
import { useNavigate } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { Container, Grid } from '@mui/material'
import useSettings from '../../hooks/useSettings'
import LogoutIcon from '@mui/icons-material/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { SettingsTabsUI } from '../../components/components'
import { ROUTES, SETTINGS_TAB_ARRAY } from '@cookup/constant'
import { SET_LOGOUT_MODAL, SET_TAB_VALUE } from '@cookup/redux'
import { CustomDialog, Form, Layout, MuiCustomTab } from '@cookup/components'

export const SettingsContainer = () => {
  const dispatch = useDispatch()
  const naviagte = useNavigate()
  const { mobileMode } = useBreakPoints()

  const { tabValue } = useSelector((state: any) => state.user)
  const { isLogoutModal } = useSelector((state: any) => state.settings)

  const { methods, onSubmit, isValid } = useSettings({
    isPasswordScreen: tabValue === 'password',
  })

  const onLogout = () => {
    dispatch(SET_LOGOUT_MODAL(false))
    naviagte(ROUTES.LOGIN_ACCOUNT)
  }

  useEffect(() => {
    dispatch(SET_TAB_VALUE('email'))
  }, [])

  return (
    <Layout
      showButton1
      button1Text="Logout"
      title="Personal Settings"
      button1Icon={mobileMode ? <LogoutIcon /> : undefined}
      onButton1Click={() => dispatch(SET_LOGOUT_MODAL(true))}
    >
      <Container maxWidth="xl">
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container>
              <Grid
                item
                md={11}
                xs={12}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <Grid item xs={12}>
                  <MuiCustomTab labels={SETTINGS_TAB_ARRAY} />
                </Grid>
                <SettingsTabsUI tabValue={tabValue} isValid={isValid} />
              </Grid>
            </Grid>
          </Form>
        </FormProvider>
        {isLogoutModal && (
          <CustomDialog
            isOkButton
            title="Log Out"
            isCancleButton
            onConfirm={onLogout}
            cancelButtonText="No"
            isOpen={isLogoutModal}
            okButtonText="Yes, I confirm"
            icon="/assets/icons/warn-icon.svg"
            onClose={() => dispatch(SET_LOGOUT_MODAL(false))}
            text="Are you sure you want to logout Cook Up Admin Panel? You will need to re-login to enter again."
          />
        )}
      </Container>
    </Layout>
  )
}

export default SettingsContainer
