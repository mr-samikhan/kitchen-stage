import React, { useEffect } from 'react'
import { ROUTES } from '@cookup/constant'
import { useForm } from 'react-hook-form'
import { AppDispatch } from 'redux/store/store'
import { loginUser, selectUser } from '@cookup/redux'
import { useDispatch, useSelector } from 'react-redux'
import { ILoginFormResolver } from 'types/FormResolvers'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LoginFormResolver,
  ForgotPasswordFormResolver,
  ResetPasswordFormResolver,
} from '@cookup/utils'

export default function useLoginForm() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector(selectUser)

  const [isSnackBar, setIsSnackBar] = React.useState(false)
  const [isPasswordSent, setIsPasswordSent] = React.useState(false)
  const [isPasswordResetModal, setIsPasswordResetModal] = React.useState(false)

  useEffect(() => {
    if (user) {
      return navigate(ROUTES.ROOT)
    }
  }, [])

  //forgot password screen
  let PATH_CHECK = pathname === ROUTES.FORGOT_PASSWORD
  let RESET_PATH_CHECK = pathname === ROUTES.RESET_PASSWORD
  let LOGIN_PATH_CHECK = pathname === ROUTES.LOGIN_ACCOUNT

  const methods = useForm<ILoginFormResolver>({
    resolver: RESET_PATH_CHECK
      ? ResetPasswordFormResolver
      : PATH_CHECK
      ? ForgotPasswordFormResolver
      : LoginFormResolver,
  })
  const isError = methods.formState.isValid

  const onForgotPassword: any = () => {
    methods.reset()
    navigate(ROUTES.FORGOT_PASSWORD)
  }

  const onResetPassword: any = () => {
    methods.reset()
    setIsPasswordSent(false)
    navigate(ROUTES.RESET_PASSWORD)
  }

  const onResetSuccess: any = () => {
    methods.reset()
    setIsPasswordResetModal(false)
    navigate(ROUTES.LOGIN_ACCOUNT)
  }

  const onSubmit = async (data: any) => {
    if (PATH_CHECK) {
      setIsPasswordSent(true)
    } else {
      const { email, password } = data || {}
      if (email && password) {
        try {
          await dispatch(
            loginUser({
              email,
              password,
            })
          )
        } catch (error: any) {
          if (error?.message === 'auth/not-admin') {
            setIsSnackBar(true)
          } else {
            console.error(error)
          }
        }
      } else if (LOGIN_PATH_CHECK) {
        setIsSnackBar(true)
      } else {
        setIsPasswordResetModal(true)
      }
    }
  }

  return {
    navigate,
    onSubmit,
    methods,
    isError,
    pathname,
    isSnackBar,
    setIsSnackBar,
    isPasswordSent,
    onForgotPassword,
    onResetPassword,
    onResetSuccess,
    setIsPasswordSent,
    isPasswordResetModal,
    setIsPasswordResetModal,
  }
}
