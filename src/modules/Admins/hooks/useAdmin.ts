import { Api } from '@cookup/services'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getErrorMessage } from '@cookup/constant'
import { AdminsFormResolver } from '@cookup/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { IAdminsFormResolver } from 'types/FormResolvers'
import {
  CLOSE_ADMIN_MODAL,
  OPEN_ADMIN_SUCCESS,
  CLOSE_EDIT_ADMIN_MODAL,
  OPEN_ADMIN_EDIT_SUCCESS,
  OPEN_DELETE_ADMIN_MODAL,
} from '@cookup/redux'

interface IAdmins {
  admins: any
}

export const useAdmins = ({ admins }: IAdmins) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const [admin, setAdmin] = React.useState<any>(null)
  const { isAdminEditModal } = useSelector((state: any) => state.admin)
  const [delAdminName, setDelAdminName] = React.useState<string | null>(null)

  const methods = useForm<IAdminsFormResolver>({
    resolver: AdminsFormResolver,
  })

  let isValid = methods.formState.isValid

  const onSelectUser = (user: any) => {
    setAdmin(user)
    methods.reset({
      name: user?.userName,
      email: user?.email,
      role: user?.role,
    })
  }

  const { email } = methods.watch()
  let emailCheck =
    isAdminEditModal &&
    admins?.some((el: any) => el?.uid !== admin?.uid && el?.email === email)

  useEffect(() => {
    if (!isAdminEditModal) {
      methods.reset({
        name: '',
        email: '',
        role: '',
      })
    }
  }, [isAdminEditModal])

  const { mutate, isError, isLoading } = useMutation(
    isAdminEditModal ? Api.admin.updateAdmin : Api.admin.addAdmin,
    {
      onSuccess: () => {
        if (isAdminEditModal) {
          dispatch(CLOSE_EDIT_ADMIN_MODAL())
          dispatch(OPEN_ADMIN_EDIT_SUCCESS())
        } else {
          dispatch(CLOSE_ADMIN_MODAL())
          dispatch(OPEN_ADMIN_SUCCESS())
        }
      },
      onError: (error) => {
        const errorMsg = getErrorMessage(error)
        alert(errorMsg)
      },
    }
  )

  const onSubmit = (data: any) => {
    if (isAdminEditModal) {
      mutate({
        emailCheck,
        data: {
          uid: admin.uid,
          email: data.email,
          userName: data.name,
          role: data.role,
        },
      })
    } else {
      mutate({
        email: data.email,
        role: data.role,
        userName: data.name,
      })
    }
  }

  const onDelete = (name: string) => {
    setDelAdminName(name)
    dispatch(OPEN_DELETE_ADMIN_MODAL())
  }
  return {
    methods,
    onSubmit,
    isValid,
    onDelete,
    delAdminName,
    onSelectUser,
    isError,
    isLoading,
  }
}

export default useAdmins
