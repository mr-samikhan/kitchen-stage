import { Box, Button } from '@mui/material'
import { useAdmins } from '../../hooks/hooks'
import { FormProvider } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { CustomTextField, Form } from '@cookup/components'
import { CLOSE_ADMIN_MODAL, CLOSE_EDIT_ADMIN_MODAL } from '@cookup/redux'

interface AdminFormsUIProps {
  isValid?: boolean
}

export const AdminFormsUI = (props: AdminFormsUIProps) => {
  const { isValid } = props || {}
  const dispatch = useDispatch()

  const { isAdminEditModal } = useSelector((state: any) => state.admin)

  return (
    // <FormProvider {...methods}>
    //   <Form onSubmit={methods.handleSubmit(onSubmit)}>
    <>
      <Box mt={1}>
        <CustomTextField
          select
          fullWidth
          name="role"
          options={[
            { label: 'Admin', value: 'Admin' },
            { label: 'Super Admin', value: 'Super Admin' },
          ]}
        />
      </Box>
      <Box mt={1}>
        <CustomTextField fullWidth name="name" placeholder="Admin Name" />
      </Box>
      <Box mt={1}>
        <CustomTextField
          fullWidth
          name="email"
          placeholder="Admin Email Address"
        />
      </Box>
      <Box mt={2} display="flex" gap={2} justifyContent="center">
        <Button
          type="submit"
          disabled={!isValid}
          variant="contained"
          sx={{
            height: 60,
            width: 200,
          }}
        >
          {isAdminEditModal ? 'Update Admin' : 'Add Admin'}
        </Button>
        <Button
          variant="outlined"
          sx={{ width: 130 }}
          onClick={() =>
            isAdminEditModal
              ? dispatch(CLOSE_EDIT_ADMIN_MODAL())
              : dispatch(CLOSE_ADMIN_MODAL())
          }
        >
          Cancel
        </Button>
      </Box>
    </>
    //   </Form>
    // </FormProvider>
  )
}

export default AdminFormsUI
