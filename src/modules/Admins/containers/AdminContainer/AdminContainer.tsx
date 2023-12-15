import { FormProvider } from 'react-hook-form'
import { useAdmins } from '../../hooks/useAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { ADMINS_DATA, ADMINS_HEADER } from '@cookup/constant'
import { CustomDialog, CustomList, Form, Layout } from '@cookup/components'
import { AdminFormsUI } from '../../components/AdminFormsUI/AdminFormsUI'
import {
  CLOSE_ADMIN_MODAL,
  CLOSE_ADMIN_SUCCESS,
  CLOSE_EDIT_ADMIN_MODAL,
  CLOSE_ADMIN_EDIT_SUCCESS,
} from '@cookup/redux'

export const AdminContainer = () => {
  const dispatch = useDispatch()

  const { methods, onSubmit, isValid } = useAdmins()

  const { isOpenAdminModal } = useSelector((state: any) => state.header)

  const { isAdminSuccess, isAdminEditModal, isAdminEditSuccess } = useSelector(
    (state: any) => state.admin
  )

  let MODAL_CHECK = isOpenAdminModal || isAdminEditModal

  let adminName = methods.watch('name')

  return (
    <Layout isTitle isAddNewAdminBtn>
      <CustomList
        isActionButtons
        data={ADMINS_DATA}
        headerData={ADMINS_HEADER}
      />
      {MODAL_CHECK && (
        <CustomDialog
          isOpen={isOpenAdminModal || isAdminEditModal}
          onClose={() =>
            isOpenAdminModal
              ? dispatch(CLOSE_ADMIN_MODAL())
              : dispatch(CLOSE_EDIT_ADMIN_MODAL())
          }
          title={isAdminEditModal ? 'Update Admin' : 'Add New Admin'}
        >
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <AdminFormsUI isValid={isValid} />
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
          icon="assets/icons/user_circle.svg"
          onConfirm={() => dispatch(CLOSE_ADMIN_SUCCESS())}
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
          icon="assets/icons/user_circle.svg"
          onConfirm={() => dispatch(CLOSE_ADMIN_EDIT_SUCCESS())}
          onClose={() => dispatch(CLOSE_ADMIN_EDIT_SUCCESS())}
          text={`Congratulations! “${adminName}” has been updated successfully.`}
          okButtonStyle={{
            p: 2,
            width: 205,
          }}
        />
      )}
    </Layout>
  )
}

export default AdminContainer
