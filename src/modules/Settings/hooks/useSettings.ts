import React from 'react'
import { Api } from '@cookup/services'
import { auth } from '@cookup/firebase'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { getErrorMessage } from '@cookup/constant'
import { SET_SETTINGS_ERROR } from '@cookup/redux'
import { SettingsFormResolver, UserPasswordResetResolver } from '@cookup/utils'

interface IuseSettings {
  email: string
  password: string
  new_password: string
}

interface IuseSettingsProps {
  isPasswordScreen?: boolean
}

const useSettings = (props: IuseSettingsProps) => {
  const { isPasswordScreen } = props || {}

  const dispatch = useDispatch()

  const methods = useForm<any>({
    resolver: isPasswordScreen
      ? SettingsFormResolver
      : UserPasswordResetResolver,
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
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

  const onSubmit = (data: IuseSettings) => {
    if (isPasswordScreen) {
      onPasswordChange({
        email: auth.currentUser?.email || '',
        currentPassword: data.password,
        newPassword: data.new_password,
      })
    }
  }

  return { onSubmit, methods, isValid, isLoading }
}

export default useSettings
