import React from 'react'
import { useForm } from 'react-hook-form'
import { IUserEmailresolver } from '@cookup/types'
import { useDispatch, useSelector } from 'react-redux'
import {
  SET_SUSPEND_MODAL,
  SET_USER_SUSPENSION,
  USER_ACCOUNT_UPDATED,
  USER_RESET_PASSWORD,
} from '@cookup/redux'
import { SuspendUserResolver, UserPasswordResetResolver } from '@cookup/utils'

const useUser = () => {
  const dispatch = useDispatch()

  const { isSuspendModal } = useSelector((state: any) => state.header)

  const methods = useForm<IUserEmailresolver>({
    resolver: isSuspendModal ? SuspendUserResolver : UserPasswordResetResolver,
  })

  const isValid = methods.formState.isValid
  console.log(methods.formState.errors)

  const onUpdateUser = () => {
    dispatch(USER_ACCOUNT_UPDATED(true))
  }

  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(USER_RESET_PASSWORD(true))
    // methods.reset()
  }

  const onSubmitSuspension = (data: any) => {
    console.log(data)
    methods.reset()
  }

  const onSevenDaysSuspend = () => {
    dispatch(SET_USER_SUSPENSION(true))
    console.log('7 days')
  }

  return {
    methods,
    onSubmit,
    isValid,
    onUpdateUser,
    onSubmitSuspension,
    onSevenDaysSuspend,
  }
}

export default useUser
