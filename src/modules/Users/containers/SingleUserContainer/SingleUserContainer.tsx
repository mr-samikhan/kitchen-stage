import React from 'react'
import useUser from '../../hooks/useUser'
import { Box, Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { USER_TAB_OPTIONS } from '@cookup/constant'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
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
  Form,
  Layout,
  TableFooter,
  CustomDialog,
  MuiCustomTab,
} from '@cookup/components'
import {
  SuspendModalUI,
  SuspensionAlert,
  UserAccountInfo,
  UserProfileInfo,
  UserUploadedMedia,
} from '@cookup/modules'

export const SingleUserContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { state } = useLocation()

  const { isUserUpdateModal } = useSelector((state: any) => state.user)
  const {
    isDeleteModal,
    isSuspendModal,
    isDeleteSuccess,
    isUserSuspened,
    unsuspenedUser,
    isUserSuspension,
    isSuspensionSuccess,
  } = useSelector((state: any) => state.header)

  const {
    methods,
    onSubmit,
    isValid,
    onUpdateUser,
    onSubmitSuspension,
    onSevenDaysSuspend,
  } = useUser()

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

  return (
    <Layout
      isDeleteBtn
      isNavigation
      onGoBack={() => navigate(-1)}
      navigationTitle={state.name || state.businessName}
      isSuspendBtn={isUserSuspened ? 'Unsuspend' : 'Suspend'}
    >
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
            />
          </Grid>
          <RenderUserSteps />
        </Grid>
        <TableFooter isExportCSV />
      </Box>
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
          okButtonText="Yes, I Confirm"
          isCancleButton
          cancelButtonText="No"
          isOpen={isDeleteModal}
          title="Delete User"
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
          isOpen={isDeleteSuccess}
          title="User Deleted"
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
          isOpen={isSuspendModal}
          title="Suspend User"
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
          text="“Emma Gosling” has been suspended for 7 days."
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
          icon="/assets/icons/suspend-icon.svg"
          onClose={() => dispatch(SET_UNSUSPEND_USER(false))}
          text="Are you sure you want to unsuspend the user “Emma Gosling”?"
          onConfirm={() => {
            dispatch(SET_UNSUSPEND_USER(false))
            dispatch(SET_SUSPENSION_SUCCESS(true))
          }}
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}
      {isSuspensionSuccess && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <SuspensionAlert />
        </Box>
      )}
    </Layout>
  )
}

export default SingleUserContainer
