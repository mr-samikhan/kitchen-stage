import React from 'react'
import { Api } from '@cookup/services'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { SuspendUserResolver } from '@cookup/utils'
import { SET_CONFIRM_SUSPENSION, SET_TOOL_TIP } from '@cookup/redux'

export const useSupport = () => {
  const dispatch = useDispatch()
  const methods = useForm<any>({
    resolver: SuspendUserResolver,
  })

  const isValid = methods.formState.isValid

  //mutation
  const { mutate: onSuspendUser, isLoading: isSuspendLoading } = useMutation<
    any,
    any,
    any
  >(Api.user.updateUser, {
    onSuccess: (success) => {
      if (success === 'suspended') {
        dispatch(
          SET_TOOL_TIP({
            isToolTip: null,
            isToolTipModal: false,
          })
        )
        dispatch(SET_CONFIRM_SUSPENSION(false))
      } else {
        dispatch(
          SET_TOOL_TIP({
            isToolTip: null,
            isToolTipModal: false,
          })
        )
        dispatch(SET_CONFIRM_SUSPENSION(false))
      }
    },
    onError: (error) => {
      console.log(error)
      alert('Something went wrong')
    },
  })

  const onSubmit = (data: any) => {
    dispatch(SET_CONFIRM_SUSPENSION(true))
  }
  const onSevenDaysSuspend = () => {
    dispatch(SET_CONFIRM_SUSPENSION(true))
  }

  return {
    isValid,
    methods,
    onSubmit,
    onSuspendUser,
    isSuspendLoading,
    onSevenDaysSuspend,
  }
}

export default useSupport
