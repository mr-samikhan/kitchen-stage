import React from 'react'
import { useForm } from 'react-hook-form'
import { SettingsFormResolver, UserPasswordResetResolver } from '@cookup/utils'

interface IuseSettings {
  email: string
}

interface IuseSettingsProps {
  isPasswordScreen?: boolean
}

const useSettings = (props: IuseSettingsProps) => {
  const { isPasswordScreen } = props || {}

  const methods = useForm<any>({
    resolver: isPasswordScreen
      ? SettingsFormResolver
      : UserPasswordResetResolver,
    defaultValues: {
      email: '',
      password: 'Abcd@123',
      confirmPassword: '',
    },
  })

  const isValid = methods.formState.isValid

  const onSubmit = (data: IuseSettings) => {
    console.log(data)
  }

  return { onSubmit, methods, isValid }
}

export default useSettings
