import { Api } from '@cookup/services'
import React, { useEffect } from 'react'
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

  const [filteredData, setFilteredData] = React.useState<any>(null)

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

  //mutation for filter & search
  const { mutate: onTypeFilter, data } = useMutation<any, any, any>(
    Api.support.filterDataByType,
    {
      onSuccess: (success) => {
        setFilteredData(success)
      },
    }
  )

  const onSubmit = (data: any) => {
    dispatch(SET_CONFIRM_SUSPENSION(true))
  }
  const onSevenDaysSuspend = () => {
    dispatch(SET_CONFIRM_SUSPENSION(true))
  }

  return {
    data,
    isValid,
    methods,
    onSubmit,
    filteredData,
    onTypeFilter,
    onSuspendUser,
    setFilteredData,
    isSuspendLoading,
    onSevenDaysSuspend,
  }
}

export default useSupport
