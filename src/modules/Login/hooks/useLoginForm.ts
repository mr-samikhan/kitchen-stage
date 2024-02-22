import { Api } from '@cookup/services'
import React, { useEffect } from 'react'
import { ROUTES } from '@cookup/constant'
import { set, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
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
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@cookup/firebase'

export default function useLoginForm() {
  const navigate = useNavigate()
  const { pathname, state: oobCode } = useLocation()

  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector(selectUser)

  const [step, setStep] = React.useState(0)
  const [otp, setOtp] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [phoneStatus, setPhoneStatus] = React.useState({
    isError: false,
    isSuccess: false,
    message: '',
  })
  const [isSnackBar, setIsSnackBar] = React.useState(false)
  const [isPasswordSent, setIsPasswordSent] = React.useState(false)
  const [confirmationObject, setConfirmationObject] = React.useState<any>({})
  const [isPasswordResetModal, setIsPasswordResetModal] = React.useState(false)

  //oobCode
  console.log('>>>oobCode', oobCode)

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
    navigate(ROUTES.LOGIN_ACCOUNT)
  }

  const onResetSuccess: any = () => {
    methods.reset()
    setIsPasswordResetModal(false)
    navigate(ROUTES.LOGIN_ACCOUNT)
  }

  //mutation forgot_password
  const { isLoading, mutate: onForgotPassword_ } = useMutation(
    Api.auth.forgotPassword,
    {
      onSuccess: () => setIsPasswordSent(true),
      onError: (error) => alert(error),
    }
  )

  const onSubmit = async (data: any) => {
    if (PATH_CHECK) {
      onForgotPassword_(data.email)
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
          navigate(ROUTES.LOGIN_2FA)
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

  //reCapcha
  const reCapcha = (phone: string) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {}
    )
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth, phone, recaptchaVerifier)
  }

  //send otp
  const onSendOTP = async () => {
    try {
      if (!phone)
        return setPhoneStatus((prev) => ({
          ...prev,
          isError: true,
          message: `Mobile number wasn’t entered properly. Please try again`,
        }))
      const response = await reCapcha(`+${phone}`)
      setConfirmationObject(response)
      setPhoneStatus((prev) => ({
        ...prev,
        isError: false,
        message: '',
      }))
      setStep(1)
    } catch (error: any) {
      let errorCode = ''
      if (error.code === 'auth/invalid-phone-number') {
        errorCode = 'Invalid phone number'
      }
      setPhoneStatus((prev) => ({
        ...prev,
        isError: true,
        message: errorCode || error.message,
      }))
    }
  }

  //verify otp
  const onVerifyOTP = async () => {
    try {
      await confirmationObject.confirm(otp.replace(/-/g, ''))
    } catch (error) {
      console.log('>>>error', error)
    }
  }

  //otp
  const onOTPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    let cleanedValue = value.replace(/\D/g, '')
    if (cleanedValue.length > 3) {
      cleanedValue = `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3, 6)}`
    }
    setOtp(cleanedValue)
  }

  //resent otp
  const onResendOTP = async () => {
    try {
      await onSendOTP()
      setPhoneStatus((prev) => ({
        ...prev,
        isSuccess: true,
        message: 'Code resent! Check your SMS',
      }))
    } catch (error) {
      console.log('>>>error', error)
    }
  }

  return {
    otp,
    step,
    phone,
    setOtp,
    setPhone,
    navigate,
    onSubmit,
    setStep,
    methods,
    isError,
    pathname,
    onSendOTP,
    isSnackBar,
    onOTPChange,
    phoneStatus,
    onResendOTP,
    onVerifyOTP,
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
