import { useDispatch, useSelector } from 'react-redux'
import { ADMINS_DATA, ADMINS_HEADER } from '@cookup/constant'
import { CustomDialog, CustomList, Layout } from '@cookup/components'
import { CLOSE_ADMIN_MODAL, CLOSE_ADMIN_SUCCESS } from '@cookup/redux'
import { AdminFormsUI } from '../../components/AdminFormsUI/AdminFormsUI'

export const AdminContainer = () => {
  const { isOpenAdminModal, isAdminSuccess } = useSelector(
    (state: any) => state.header
  )
  const dispatch = useDispatch()
  return (
    <Layout isTitle isAddNewAdminBtn>
      <CustomList
        isActionButtons
        data={ADMINS_DATA}
        headerData={ADMINS_HEADER}
      />
      {isOpenAdminModal && (
        <CustomDialog
          title="Add New Admin"
          isOpen={isOpenAdminModal}
          onClose={() => dispatch(CLOSE_ADMIN_MODAL())}
        >
          <AdminFormsUI />
        </CustomDialog>
      )}
      {isAdminSuccess && (
        <CustomDialog
          isOkButton
          okButtonText="Okay"
          title="New Admin Added"
          isOpen={isAdminSuccess}
          icon="assets/icons/user_circvle.svg"
          onConfirm={() => dispatch(CLOSE_ADMIN_SUCCESS())}
          onClose={() => dispatch(CLOSE_ADMIN_SUCCESS())}
          text="Congratulations! “Elliot Smith” has been successfully added as an Admin. We have sent them a new invite email with a one-time usage password included."
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
