import React from 'react'
import { Api } from '@cookup/services'
import { auth } from '@cookup/firebase'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getErrorMessage } from '@cookup/constant'
import { SET_SETTINGS_ERROR, selectUser } from '@cookup/redux'
import { SettingsFormResolver, UserPasswordResetResolver } from '@cookup/utils'

interface IuseSettings {
  email: string
  password: string
  userName: string
  new_password: string
  phoneNumber: string
}

interface IuseSettingsProps {
  isPasswordScreen?: boolean
}

const useSettings = (props: IuseSettingsProps) => {
  const { isPasswordScreen } = props || {}

  const currentUser: any = useSelector(selectUser)

  const dispatch = useDispatch()

  const methods = useForm<any>({
    resolver: isPasswordScreen
      ? SettingsFormResolver
      : UserPasswordResetResolver,
    defaultValues: {
      email: currentUser?.email || '',
      password: '',
      confirmPassword: '',
      userName: currentUser?.userName || '',
      phoneNumber: currentUser?.phoneNumber || '',
    },
    mode: 'onChange',
  })

  const isValid = methods.formState.isValid

  //password change mutation
  const { isLoading, mutate: onPasswordChange } = useMutation<any, any, any>(
    Api.auth.reAuthenticateUser,
    {
      onSuccess: (data) => {
        dispatch(SET_SETTINGS_ERROR({}))
        alert(data)
      },
      onError: (error) => {
        const errMsg = getErrorMessage(error)
        dispatch(SET_SETTINGS_ERROR(error))
        alert(errMsg)
        console.log(error, '>>>>')
      },
    }
  )

  //update admin mutation
  const { mutate: onUpdateAdmin, isLoading: isUpateLoading } = useMutation<
    any,
    any,
    any
  >(Api.admin.updateAdmin, {
    onSuccess: (data) => {
      currentUser?.email !== data.email && auth.signOut()
      alert(data)
    },
    onError: (error) => {
      const errMsg = getErrorMessage(error)
      alert(errMsg)
      console.log(error, '>>>>')
    },
  })

  const onSubmit = (data: IuseSettings) => {
    if (isPasswordScreen) {
      onPasswordChange({
        email: auth.currentUser?.email || '',
        currentPassword: data.password,
        newPassword: data.new_password,
      })
    } else {
      onUpdateAdmin({
        emailCheck: false,
        data: {
          uid: currentUser?.uid || '',
          email: data.email,
          userName: data.userName,
          role: currentUser?.role || '',
          phoneNumber: data.phoneNumber,
        },
      })
    }
  }

  return { onSubmit, methods, isValid, isLoading: isLoading || isUpateLoading }
}

export default useSettings
