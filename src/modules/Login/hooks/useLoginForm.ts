import React from 'react'
import { ROUTES } from '@muc/constant'
import { useForm } from 'react-hook-form'
import { ILoginFormResolver } from 'types/FormResolvers'
import { useLocation, useNavigate } from 'react-router-dom'
import { ForgotPasswordFormResolver, LoginFormResolver } from '@muc/utils'

export default function useLoginForm() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [isSnackBar, setIsSnackBar] = React.useState(false)

  //forgot password screen
  let PATH_CHECK = pathname === ROUTES.FORGOT_PASSWORD

  const methods = useForm<ILoginFormResolver>({
    resolver: PATH_CHECK ? ForgotPasswordFormResolver : LoginFormResolver,
  })
  const isError = methods.formState.isValid

  const onForgotPassword: any = () => {
    methods.reset()
    navigate(ROUTES.FORGOT_PASSWORD)
  }
  const onSubmit = (data: any) => {
    console.log('submit', data)
    const { email, password } = data || {}
    if (email === 'sami@chopdawg.com' && password === 'Abcd@123') {
      navigate(ROUTES.DASHBOARD)
      // alert('Congratulations, you are logged in')
    } else {
      setIsSnackBar(true)
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
    onForgotPassword,
  }
}
