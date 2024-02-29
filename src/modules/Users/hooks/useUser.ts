import React from 'react'
import moment from 'moment'
import { Api } from '@cookup/services'
import { useForm } from 'react-hook-form'
import { IUserEmailresolver } from '@cookup/types'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import {
  EmailResolver,
  SuspendUserResolver,
  UserPasswordResetResolver,
} from '@cookup/utils'
import {
  SET_DELETE_MODAL,
  SET_SUCCESS_DELETE,
  SET_UNSUSPEND_USER,
  SET_USER_SUSPENSION,
  USER_RESET_PASSWORD,
  USER_ACCOUNT_UPDATED,
  SET_SUSPENSION_SUCCESS,
} from '@cookup/redux'

interface IUseUser {
  user: any
}

interface IUserValues {
  isLikesModal: boolean
}

const useUser = ({ user }: IUseUser) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const [suspenseDays, setSuspenseDays] = React.useState(null)
  const [userValues, setUserValues] = React.useState<any>({
    likesData: null,
    isLikesModal: false,
    isCommentsModal: false,
    isSuccessModal: false,
  })

  const { isSuspendModal } = useSelector((state: any) => state.header)

  const methods = useForm<IUserEmailresolver>({
    resolver: isSuspendModal ? SuspendUserResolver : EmailResolver,
    mode: 'onChange',
  })

  const isValid = methods.formState.isValid

  const onUpdateUser = () => {
    dispatch(USER_ACCOUNT_UPDATED(true))
  }

  //mutation
  const { mutate: onSuspendUser, isLoading: isSuspendLoading } = useMutation<
    any,
    any,
    any
  >(Api.user.updateUser, {
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
  })

  //delete mutation
  const { mutate: onDeleteUser, isLoading: isDelLoading } = useMutation(
    Api.user.deleteUser,
    {
      onSuccess: (success) => {
        dispatch(SET_DELETE_MODAL(false))
        dispatch(SET_SUCCESS_DELETE(true))
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  //reset password mutation
  const { mutate: onResetPassword, isLoading: isResetLoading } = useMutation(
    Api.auth.forgotPassword,
    {
      onSuccess: () => {
        dispatch(USER_RESET_PASSWORD(true))
      },
      onError: (error) => console.log(error),
    }
  )

  //update user mutation
  const { mutate: onUpdateUser_rec, isLoading: isUpdateLoading } = useMutation(
    Api.user.updateUser,
    {
      onSuccess: () => {
        onUpdateUser()
        queryClient.invalidateQueries('getUser')
      },
      onError: (error) => console.log(error),
    }
  )

  //get user likes and comments
  const { mutate: getUserLikesAndComments, data: userLikesCommentsData } =
    useMutation<any, any, any>(Api.recipe.getUserRecipeLikesAndComments, {
      onSuccess: () => {
        queryClient.invalidateQueries('getUser')
      },
      onError: (error) => console.log(error),
    })

  //delete user likes and comments
  const { mutate: deleteUserLikesAndComments } = useMutation<any, any, any>(
    userValues.isLikesModal
      ? Api.recipe.removeLikedById
      : Api.recipe.removeCommentById,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getUser')
      },
      onError: (error) => console.log(error),
    }
  )

  const onSubmit = (data: any) => {
    console.log(data)
    onResetPassword(user.email)
    // methods.reset()
  }

  const onSubmitSuspension = (data: any) => {
    onSuspendUser({
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
    onSuspendUser({
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
    onSuspendUser({
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

  //delete like
  const onDeleteLike = () => {
    setUserValues((prev: any) => ({
      ...prev,
      isLikesModal: false,
      isSuccessModal: false,
    }))
  }

  //select like data
  const onSelectLike: any = async (item: {
    id: string
    userId: string
    comment: string
  }) => {
    deleteUserLikesAndComments({
      recipeId: item.id,
      userId: item.userId,
      comment: item.comment,
    })
    setUserValues((prev: any) => ({
      ...prev,
      likesData: item,
      isSuccessModal: true,
    }))
  }

  //select recipe data
  const onSelectRecipe = async (item: { id: string }) => {
    getUserLikesAndComments({
      userUploadedRecipes: user.userUploadedRecipes,
      recipeId: item.id,
    })
  }

  return {
    methods,
    onSubmit,
    isValid,
    userValues,
    onUnsuspend,
    suspenseDays,
    onSelectLike,
    onDeleteLike,
    onUpdateUser,
    isDelLoading,
    onDeleteUser,
    setUserValues,
    onSelectRecipe,
    isResetLoading,
    isUpdateLoading,
    userLikesCommentsData,
    onUpdateUser_rec,
    isSuspendLoading,
    onSubmitSuspension,
    onSevenDaysSuspend,
  }
}

export default useUser
