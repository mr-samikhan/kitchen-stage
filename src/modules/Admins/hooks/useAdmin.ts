import React from 'react'
import { useForm } from 'react-hook-form'
import { AdminsFormResolver } from '@cookup/utils'
import { useDispatch, useSelector } from 'react-redux'
import { IAdminsFormResolver } from 'types/FormResolvers'
import {
  CLOSE_ADMIN_MODAL,
  OPEN_ADMIN_SUCCESS,
  OPEN_ADMIN_EDIT_SUCCESS,
  CLOSE_EDIT_ADMIN_MODAL,
  OPEN_DELETE_ADMIN_MODAL,
} from '@cookup/redux'

export const useAdmins = () => {
  const dispatch = useDispatch()

  const [delAdminName, setDelAdminName] = React.useState<string | null>(null)

  const methods = useForm<IAdminsFormResolver>({
    resolver: AdminsFormResolver,
  })

  const { isAdminEditModal } = useSelector((state: any) => state.admin)

  let isValid = methods.formState.isValid

  const onSubmit = (data: any) => {
    console.log(data)
    if (isAdminEditModal) {
      dispatch(CLOSE_EDIT_ADMIN_MODAL())
      dispatch(OPEN_ADMIN_EDIT_SUCCESS())
    } else {
      dispatch(CLOSE_ADMIN_MODAL())
      dispatch(OPEN_ADMIN_SUCCESS())
    }
  }

  const onDelete = (name: string) => {
    setDelAdminName(name)
    dispatch(OPEN_DELETE_ADMIN_MODAL())
  }
  return { methods, onSubmit, isValid, onDelete, delAdminName }
}

export default useAdmins
