import { useDispatch } from 'react-redux'
import { Box, Button } from '@mui/material'
import { useAdmins } from '../../hooks/hooks'
import { FormProvider } from 'react-hook-form'
import { CLOSE_ADMIN_MODAL } from '@cookup/redux'
import { CustomTextField, Form } from '@cookup/components'

export const AdminFormsUI = () => {
  const { onSubmit, methods, isValid } = useAdmins()

  const dispatch = useDispatch()

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
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
          <CustomTextField
            fullWidth
            name="email"
            placeholder="Admin Email Address"
          />
        </Box>
        <Box mt={1}>
          <CustomTextField fullWidth name="name" placeholder="Admin Name" />
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
            Add Admin
          </Button>
          <Button
            variant="outlined"
            sx={{ width: 130 }}
            onClick={() => dispatch(CLOSE_ADMIN_MODAL())}
          >
            Cancel
          </Button>
        </Box>
      </Form>
    </FormProvider>
  )
}

export default AdminFormsUI
