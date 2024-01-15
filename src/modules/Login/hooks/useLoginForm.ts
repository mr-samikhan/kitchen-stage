import React from 'react'
import { ROUTES } from '@cookup/constant'
import { useForm } from 'react-hook-form'
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

  const [isSnackBar, setIsSnackBar] = React.useState(false)
  const [isPasswordSent, setIsPasswordSent] = React.useState(false)
  const [isPasswordResetModal, setIsPasswordResetModal] = React.useState(false)

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

  const onSubmit = (data: any) => {
    if (PATH_CHECK) {
      setIsPasswordSent(true)
    } else {
      const { email, password } = data || {}
      if (email && password) {
        navigate(ROUTES.ROOT)
        // alert('Congratulations, you are logged in')
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
