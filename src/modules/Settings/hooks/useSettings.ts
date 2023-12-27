import React from 'react'
import { useForm } from 'react-hook-form'
import { IUserEmailresolver } from '@cookup/types'
import { UserPasswordResetResolver } from '@cookup/utils'

interface IuseSettings {
  email: string
}

const useSettings = () => {
  const methods = useForm<IUserEmailresolver>({
    resolver: UserPasswordResetResolver,
  })
  const isValid = methods.formState.isValid

  const onSubmit = (data: IuseSettings) => {
    console.log(data)
  }
  return { onSubmit, methods, isValid }
}

export default useSettings
