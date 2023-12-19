import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { IUserEmailresolver } from '@cookup/types'
import { UserPasswordResetResolver } from '@cookup/utils'
import { USER_ACCOUNT_UPDATED, USER_RESET_PASSWORD } from '@cookup/redux'

const useUser = () => {
  const dispatch = useDispatch()

  const methods = useForm<IUserEmailresolver>({
    resolver: UserPasswordResetResolver,
  })

  const isValid = methods.formState.isValid

  const onUpdateUser = () => {
    dispatch(USER_ACCOUNT_UPDATED(true))
  }

  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(USER_RESET_PASSWORD(true))
  }

  return { methods, onSubmit, isValid, onUpdateUser }
}

export default useUser
