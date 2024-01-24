import React from 'react'
import moment from 'moment'
import useUser from '../../hooks/useUser'
import { Delete } from '@mui/icons-material'
import { FormProvider } from 'react-hook-form'
import { USER_TAB_OPTIONS } from '@cookup/constant'
import { Box, Container, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useBreakPoints, useGetUser } from '@cookup/hooks'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled'
import {
  Form,
  Layout,
  CustomDialog,
  MuiCustomTab,
  CustomLoader,
} from '@cookup/components'
import {
  SET_TAB_VALUE,
  SET_DELETE_MODAL,
  SET_SUSPEND_MODAL,
  SET_SUCCESS_DELETE,
  SET_UNSUSPEND_USER,
  SET_USER_SUSPENSION,
  USER_ACCOUNT_UPDATED,
  SET_SUSPENSION_SUCCESS,
} from '@cookup/redux'
import {
  ViewAds,
  SuspendModalUI,
  SuspensionAlert,
  UserAccountInfo,
  UserProfileInfo,
  UserUploadedMedia,
} from '@cookup/modules'

export const SingleUserContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams()

  const { user, userLoading } = useGetUser(id || '')

  const { state } = useLocation()
  const { mobileMode } = useBreakPoints()

  const { isUserUpdateModal } = useSelector((state: any) => state.user)
  const {
    isDeleteModal,
    isSuspendModal,
    isDeleteSuccess,
    unsuspenedUser,
    isUserSuspension,
    isSuspensionSuccess,
  } = useSelector((state: any) => state.header)

  const {
    methods,
    onSubmit,
    isValid,
    onUnsuspend,
    suspenseDays,
    onUpdateUser,
    onSubmitSuspension,
    onSevenDaysSuspend,
  } = useUser({ user })

  const { tabValue } = useSelector((state: any) => state.user)

  React.useEffect(() => {
    dispatch(SET_TAB_VALUE('account-info'))
  }, [])

  const RenderUserSteps = () => {
    switch (tabValue) {
      case 'account-info':
        return (
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <UserAccountInfo isValid={isValid} onUpdateUser={onUpdateUser} />
            </Form>
          </FormProvider>
        )
      case 'profile-info':
        return <UserProfileInfo isBusinessType={state.type ? true : false} />
      case 'uploaded-media':
        return <UserUploadedMedia />
      case 'ads':
        return <ViewAds />
      default:
        return (
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <UserAccountInfo isValid={isValid} onUpdateUser={onUpdateUser} />
            </Form>
          </FormProvider>
        )
    }
  }

  if (userLoading) return <CustomLoader />

  return (
    <Layout
      isFooter
      isExportCSV
      isNavigation
      showButton1
      showButton2
      bgcolor="#F5F5F5"
      button2Text="Delete"
      button2Variant="outlined"
      onGoBack={() => navigate(-1)}
      button2Icon={mobileMode ? <Delete /> : undefined}
      navigationTitle={state.name || state.businessName}
      button1Text={user?.isSuspended ? 'Unsuspend' : 'Suspend'}
      onButton2Click={() => dispatch(SET_DELETE_MODAL(true))}
      button1Icon={mobileMode ? <PersonAddDisabledIcon /> : undefined}
      onButton1Click={() =>
        dispatch(
          user?.isSuspended ? SET_UNSUSPEND_USER(true) : SET_SUSPEND_MODAL(true)
        )
      }
    >
      <Container maxWidth="xl">
        <Box
          display="flex"
          minHeight="80vh"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Grid container alignItems="center" flexDirection="column" mt={4}>
            <Grid item md={6} xs={12}>
              <MuiCustomTab
                className="custom-tabs"
                labels={USER_TAB_OPTIONS}
                width={{ xs: '100px', md: '188px' }}
                isBusinessType={state.type ? true : false}
              />
            </Grid>
            {RenderUserSteps()}
          </Grid>
        </Box>
      </Container>
      {isUserUpdateModal && (
        <CustomDialog
          isOkButton
          okButtonText="Okay"
          isOpen={isUserUpdateModal}
          title="User Account Info Updated"
          icon="/assets/icons/user_circle.svg"
          onClose={() => dispatch(USER_ACCOUNT_UPDATED(false))}
          onConfirm={() => dispatch(USER_ACCOUNT_UPDATED(false))}
          text="Account info of “Emma Gosling” has been succesfully updated."
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}

      {isDeleteModal && (
        <CustomDialog
          isOkButton
          isCancleButton
          title="Delete User"
          cancelButtonText="No"
          isOpen={isDeleteModal}
          okButtonText="Yes, I Confirm"
          icon="/assets/icons/warn-icon.svg"
          onClose={() => dispatch(SET_DELETE_MODAL(false))}
          onConfirm={() => {
            dispatch(SET_DELETE_MODAL(false))
            dispatch(SET_SUCCESS_DELETE(true))
          }}
          text="Are you sure you want to delete the user “Emma Gosling”? Actions are not reversable."
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}
      {isDeleteSuccess && (
        <CustomDialog
          isOkButton
          okButtonText="Okay"
          title="User Deleted"
          isOpen={isDeleteSuccess}
          icon="/assets/icons/warn-icon.svg"
          onClose={() => dispatch(SET_SUCCESS_DELETE(false))}
          onConfirm={() => dispatch(SET_SUCCESS_DELETE(false))}
          text="“Emma Gosling” has been removed from the system successfully. "
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}
      {isSuspendModal && (
        <CustomDialog
          title="Suspend User"
          isOpen={isSuspendModal}
          icon="/assets/icons/suspend-icon.svg"
          onClose={() => dispatch(SET_SUSPEND_MODAL(false))}
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        >
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmitSuspension)}>
              <SuspendModalUI
                methods={methods}
                onSevenDaysSuspend={onSevenDaysSuspend}
              />
            </Form>
          </FormProvider>
        </CustomDialog>
      )}
      {isUserSuspension && (
        <CustomDialog
          isOkButton
          okButtonText="Okay"
          title="User Suspended"
          isOpen={isUserSuspension}
          icon="/assets/icons/suspend-icon.svg"
          onClose={() => dispatch(SET_USER_SUSPENSION(false))}
          text={`“${user.firstName}” has been suspended for ${
            suspenseDays || 7
          } days.`}
          onConfirm={() => {
            dispatch(SET_SUSPEND_MODAL(false))
            dispatch(SET_USER_SUSPENSION(false))
            dispatch(SET_SUSPENSION_SUCCESS(true))
          }}
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}
      {unsuspenedUser && (
        <CustomDialog
          isOkButton
          isCancleButton
          cancelButtonText="No"
          title="Unsuspend User"
          isOpen={unsuspenedUser}
          okButtonText="Yes, I Confirm"
          onConfirm={() => onUnsuspend()}
          icon="/assets/icons/suspend-icon.svg"
          onClose={() => dispatch(SET_UNSUSPEND_USER(false))}
          text={`Are you sure you want to unsuspend the user “${user.firstName}”?`}
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}
      {isSuspensionSuccess && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <SuspensionAlert
            isSuspended={user?.isSuspended}
            suspensionDuration={moment(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).format('MMMM DD, YYYY')}
          />
        </Box>
      )}
    </Layout>
  )
}

export default SingleUserContainer
