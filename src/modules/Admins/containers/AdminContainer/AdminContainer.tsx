import { Box } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useQueryClient } from 'react-query'
import { FormProvider } from 'react-hook-form'
import { useAdmins } from '../../hooks/useAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { useBreakPoints, useGetAdmins, usePagination } from '@cookup/hooks'
import { ADMINS_DATA, ADMINS_HEADER } from '@cookup/constant'
import { AdminFormsUI } from '../../components/AdminFormsUI/AdminFormsUI'
import { CustomDialog, CustomList, Form, Layout } from '@cookup/components'
import {
  OPEN_ADMIN_MODAL,
  CLOSE_ADMIN_MODAL,
  CLOSE_ADMIN_SUCCESS,
  CLOSE_EDIT_ADMIN_MODAL,
  CLOSE_ADMIN_EDIT_SUCCESS,
  CLOSE_DELETE_ADMIN_MODAL,
  OPEN_DELETE_ADMIN_SUCCESS,
} from '@cookup/redux'

export const AdminContainer = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const { mobileMode } = useBreakPoints()

  const { admins, adminLoading } = useGetAdmins({ enabled: true })

  const {
    admin,
    methods,
    onSubmit,
    isValid,
    onDelete,
    isLoading,
    deleteAdmin,
    delAdminName,
    onSelectUser,
    isDelLoading,
  } = useAdmins({ admins })

  const { isOpenAdminModal } = useSelector((state: any) => state.header)

  const {
    isAdminSuccess,
    isAdminEditModal,
    isAdminEditSuccess,
    isDeleteAdminModal,
    isDeleteAdminSuccess,
  } = useSelector((state: any) => state.admin)

  let MODAL_CHECK = isOpenAdminModal || isAdminEditModal

  let adminName = methods.watch('name')

  const { user } = useSelector((state: any) => state.auth)

  const { currentItems, goToNextPage, goToPreviousPage } = usePagination(
    admins,
    7
  )

  return (
    <Layout
      isTitle
      isExportCSV
      showButton1
      isPaginationIcons
      button1ClassName="custom"
      button1Text="Add New Admin"
      onNextPage={goToNextPage}
      onPreviousPage={goToPreviousPage}
      button1Icon={mobileMode ? <Add /> : undefined}
      isFooter={currentItems?.length > 7 ? true : false}
      onButton1Click={() => dispatch(OPEN_ADMIN_MODAL())}
    >
      <Box mt={2}>
        <CustomList
          data={currentItems}
          isActionButtons
          onDelete={onDelete}
          isLoading={adminLoading}
          headerData={ADMINS_HEADER}
          onSelectUser={onSelectUser}
          showKeys={['userName', 'email', 'role', 'status', 'lastLogin']}
        />
      </Box>
      {MODAL_CHECK && (
        <CustomDialog
          isOpen={isOpenAdminModal || isAdminEditModal}
          title={isAdminEditModal ? 'Update Admin' : 'Add New Admin'}
          onClose={() =>
            isOpenAdminModal
              ? dispatch(CLOSE_ADMIN_MODAL())
              : dispatch(CLOSE_EDIT_ADMIN_MODAL())
          }
        >
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <AdminFormsUI isValid={isValid} isLoading={isLoading} />
            </Form>
          </FormProvider>
        </CustomDialog>
      )}
      {isAdminSuccess && (
        <CustomDialog
          isOkButton
          okButtonText="Okay"
          title={'New Admin Added'}
          isOpen={isAdminSuccess}
          icon="/assets/icons/user_circle.svg"
          onConfirm={() => {
            dispatch(CLOSE_ADMIN_SUCCESS())
            queryClient.invalidateQueries('getAdmins')
          }}
          onClose={() => dispatch(CLOSE_ADMIN_SUCCESS())}
          text={`Congratulations! “${adminName}” has been successfully added as an Admin. We have sent them a new invite email with a one-time usage password included.`}
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}
      {isAdminEditSuccess && (
        <CustomDialog
          isOkButton
          okButtonText="Okay"
          title={'Admin Updated'}
          isOpen={isAdminEditSuccess}
          icon="/assets/icons/user_circle.svg"
          onConfirm={() => {
            dispatch(CLOSE_ADMIN_EDIT_SUCCESS())
            queryClient.invalidateQueries('getAdmins')
          }}
          onClose={() => dispatch(CLOSE_ADMIN_EDIT_SUCCESS())}
          text={`Congratulations! “${
            adminName || admin.userName
          }” has been updated successfully.`}
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}
      {isDeleteAdminModal && (
        <CustomDialog
          isOkButton
          isCancleButton
          title={'Delete Admin'}
          cancelButtonText="Cancel"
          isOpen={isDeleteAdminModal}
          icon="/assets/icons/warn-icon.svg"
          okButtonText={isDelLoading ? 'Deleting...' : 'Yes, I confirm'}
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
          onConfirm={() => {
            deleteAdmin({
              uid: delAdminName.uid,
              role: delAdminName.role,
              currentUser: user,
            })
          }}
          onClose={() => dispatch(CLOSE_DELETE_ADMIN_MODAL())}
          text={`Are you sure you want to delete the admin “${delAdminName.userName}”? Actions are not reversable.`}
        />
      )}
      {isDeleteAdminSuccess && (
        <CustomDialog
          isOkButton
          okButtonText="Okay"
          title={'Admin Deleted'}
          isOpen={isDeleteAdminSuccess}
          icon="/assets/icons/delete.svg"
          onClose={() => dispatch(OPEN_DELETE_ADMIN_SUCCESS(false))}
          onConfirm={() => dispatch(OPEN_DELETE_ADMIN_SUCCESS(false))}
          text={`“${delAdminName.userName}” has been removed from the system successfully.`}
          okButtonStyle={{
            width: 205,
            p: 2,
          }}
        />
      )}
    </Layout>
  )
}

export default AdminContainer
