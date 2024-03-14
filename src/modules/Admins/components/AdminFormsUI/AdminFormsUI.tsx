import React from 'react'
import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { CustomTextField, Form } from '@cookup/components'
import { ADMIN_OPTIONS, SUPER_ADMIN_OPTIONS } from '@cookup/constant'
import { CLOSE_ADMIN_MODAL, CLOSE_EDIT_ADMIN_MODAL } from '@cookup/redux'

interface AdminFormsUIProps {
  isValid?: boolean
  isLoading?: boolean
}

export const AdminFormsUI = (props: AdminFormsUIProps) => {
  const { isValid, isLoading } = props || {}
  const dispatch = useDispatch()

  const { user } = useSelector((state: any) => state.auth)
  const { isAdminEditModal } = useSelector((state: any) => state.admin)

  return (
    <React.Fragment>
      <Box mt={1}>
        <CustomTextField
          select
          fullWidth
          name="role"
          options={user.role === 'Admin' ? ADMIN_OPTIONS : SUPER_ADMIN_OPTIONS}
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
          variant="contained"
          disabled={!isValid || isLoading}
          sx={{
            height: 60,
            width: 200,
          }}
        >
          {isLoading
            ? 'Loading...'
            : isAdminEditModal
            ? 'Update Admin'
            : 'Add Admin'}
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
    </React.Fragment>
  )
}

export default AdminFormsUI
