import { CLOSE_ADMIN_MODAL } from '@cookup/redux'
import { useDispatch, useSelector } from 'react-redux'
import { ADMINS_DATA, ADMINS_HEADER } from '@cookup/constant'
import { CustomDialog, CustomList, Layout } from '@cookup/components'
import { AdminFormsUI } from '../../components/AdminFormsUI/AdminFormsUI'

export const AdminContainer = () => {
  const { isOpenAdminModal } = useSelector((state: any) => state.header)
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
    </Layout>
  )
}

export default AdminContainer
