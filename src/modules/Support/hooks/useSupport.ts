import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { SuspendUserResolver } from '@cookup/utils'
import { SET_CONFIRM_SUSPENSION, SET_USER_SUSPENSION } from '@cookup/redux'

export const useSupport = () => {
  const dispatch = useDispatch()
  const methods = useForm<any>({
    resolver: SuspendUserResolver,
  })

  const isValid = methods.formState.isValid

  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(SET_CONFIRM_SUSPENSION(true))
    methods.reset()
  }
  const onSevenDaysSuspend = () => {
    console.log('7 days')
    dispatch(SET_CONFIRM_SUSPENSION(true))
  }
  return { onSubmit, isValid, methods, onSevenDaysSuspend }
}

export default useSupport
