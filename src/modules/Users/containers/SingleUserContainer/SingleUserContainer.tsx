import React from 'react'
import useUser from '../../hooks/useUser'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Grid } from '@mui/material'
import { USER_TAB_OPTIONS } from '@cookup/constant'
import { useDispatch, useSelector } from 'react-redux'
import {
  SET_TAB_VALUE,
  SET_DELETE_MODAL,
  SET_SUSPEND_MODAL,
  SET_SUCCESS_DELETE,
  USER_ACCOUNT_UPDATED,
} from '@cookup/redux'
import {
  Form,
  Layout,
  TableFooter,
  CustomDialog,
  MuiCustomTab,
} from '@cookup/components'
import {
  UserAccountInfo,
  UserProfileInfo,
  UserUploadedMedia,
} from '@cookup/modules'

export const SingleUserContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isUserUpdateModal } = useSelector((state: any) => state.user)
  const { isDeleteModal, isDeleteSuccess, isSuspendModal } = useSelector(
    (state: any) => state.header
  )

  const { methods, onSubmit, isValid, onUpdateUser } = useUser()

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
        return <UserProfileInfo />
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
      isSuspendBtn="Suspend"
      navigationTitle="Emma Gosling"
      onGoBack={() => navigate(-1)}
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
      {isSuspendModal && (
        <CustomDialog
          isOpen={isSuspendModal}
          title="Suspend User"
          icon="/assets/icons/suspend-icon.svg"
          onClose={() => dispatch(SET_SUSPEND_MODAL(false))}
          text="Please select a time range for suspending the selected user."
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        >
          <Button variant="contained" color="primary" fullWidth>
            Suspend 7 days
          </Button>
        </CustomDialog>
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
    </Layout>
  )
}

export default SingleUserContainer
