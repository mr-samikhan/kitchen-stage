import React from 'react'
import { set, useForm } from 'react-hook-form'
import { IUserEmailresolver } from '@cookup/types'
import { useDispatch, useSelector } from 'react-redux'
import {
  SET_SUSPEND_MODAL,
  SET_SUSPENSION_SUCCESS,
  SET_UNSUSPEND_USER,
  SET_USER_SUSPENSION,
  USER_ACCOUNT_UPDATED,
  USER_RESET_PASSWORD,
} from '@cookup/redux'
import { SuspendUserResolver, UserPasswordResetResolver } from '@cookup/utils'
import { useMutation, useQueryClient } from 'react-query'
import { Api } from '@cookup/services'
import moment from 'moment'

interface IUseUser {
  user: any
}

const useUser = ({ user }: IUseUser) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const [suspenseDays, setSuspenseDays] = React.useState(null)

  const { isSuspendModal } = useSelector((state: any) => state.header)

  const methods = useForm<IUserEmailresolver>({
    resolver: isSuspendModal ? SuspendUserResolver : UserPasswordResetResolver,
  })

  const isValid = methods.formState.isValid

  const onUpdateUser = () => {
    dispatch(USER_ACCOUNT_UPDATED(true))
  }

  //mutation
  const { mutate, isError, isLoading } = useMutation<any, any, any>(
    Api.user.updateUser,
    {
      onSuccess: (success) => {
        if (success === 'suspended') {
          dispatch(SET_USER_SUSPENSION(true))
        } else if (success === 'unsuspended') {
          dispatch(SET_UNSUSPEND_USER(false))
          dispatch(SET_SUSPENSION_SUCCESS(true))
        } else {
          setSuspenseDays(null)
          console.log(success)
        }
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(USER_RESET_PASSWORD(true))
    // methods.reset()
  }

  const onSubmitSuspension = (data: any) => {
    mutate({
      id: user.id,
      data: {
        suspensionDays: data.days,
        isSuspended: true,
        suspensionDate: new Date(),
        suspenseReason: data.reason,
        suspensionDuration: moment(
          Date.now() + data.days * 24 * 60 * 60 * 1000
        ).format('MMMM DD, YYYY'),
      },
    })
    setSuspenseDays(data.days)
    alert(`User Suspended for ${data.days} days`)
    queryClient.invalidateQueries('getUser')
  }

  const onSevenDaysSuspend = () => {
    mutate({
      id: user.id,
      data: {
        suspensionDays: 7,
        isSuspended: true,
        suspensionDate: new Date(),
        suspensionDuration: moment(Date.now() + 7 * 24 * 60 * 60 * 1000).format(
          'MMMM DD, YYYY'
        ),
      },
    })
    queryClient.invalidateQueries('getUser')
  }

  const onUnsuspend = () => {
    mutate({
      id: user.id,
      data: {
        suspensionDays: 0,
        suspensionDate: null,
        isSuspended: false,
        suspensionDuration: null,
      },
    })
    queryClient.invalidateQueries('getUser')
  }

  return {
    methods,
    onSubmit,
    isValid,
    onUnsuspend,
    suspenseDays,
    onUpdateUser,
    onSubmitSuspension,
    onSevenDaysSuspend,
  }
}

export default useUser
