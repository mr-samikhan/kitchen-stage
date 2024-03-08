import { Api } from '@cookup/services'
import { auth } from '@cookup/firebase'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { ROUTES } from '@cookup/constant'
import { set, useForm } from 'react-hook-form'
import { AppDispatch } from 'redux/store/store'
import { getCurrentUserData, loginUser, selectUser } from '@cookup/redux'
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
    recaptcha: false,
  })
  const [isSnackBar, setIsSnackBar] = React.useState(false)
  const [isPasswordSent, setIsPasswordSent] = React.useState(false)
  const [confirmationObject, setConfirmationObject] = React.useState<any>({})
  const [isPasswordResetModal, setIsPasswordResetModal] = React.useState(false)

  useEffect(() => {
    if (oobCode) {
      navigate(ROUTES.RESET_PASSWORD)
    } else {
      if (auth.currentUser && auth.currentUser?.phoneNumber) {
        return navigate(ROUTES.ROOT)
      } else if (auth.currentUser && auth.currentUser?.phoneNumber === null) {
        return navigate(ROUTES.LOGIN_2FA)
      } else {
        return navigate(ROUTES.LOGIN_ACCOUNT)
      }
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

  //mutation confirm password reset
  const { isLoading: isResetConfirm, mutate: onConfirmResetPassword } =
    useMutation(Api.auth.confirmPasswordReset, {
      onSuccess: () => setIsPasswordResetModal(true),
      onError: (error) => alert(error),
    })

  //send otp mutation
  const { mutate: onSendOTP_ } = useMutation<any, any, any>(Api.auth.sendOTP, {
    onSuccess: () => {
      setPhoneStatus((prev) => ({
        ...prev,
        isError: false,
        message: '',
      }))
      setStep(1)
    },
    onError: (error) => {
      let errorCode = ''
      if (error.code === 'auth/invalid-phone-number') {
        errorCode = 'Invalid phone number'
      }
      setPhoneStatus((prev) => ({
        ...prev,
        isError: true,
        message: errorCode || error.message,
      }))
    },
  })

  //verify otp mutation
  const { mutate: onVerifyOTP_ } = useMutation<any, any, any>(
    Api.auth.verifyOTP,
    {
      onSuccess: () => {
        setPhoneStatus((prev) => ({
          ...prev,
          isError: false,
          message: '',
        }))
        dispatch(
          getCurrentUserData({
            uid: auth.currentUser?.uid,
            email: auth.currentUser?.email,
            role: '',
            userName: auth.currentUser?.displayName,
          })
        )
        navigate(ROUTES.ROOT)
      },
      onError: (error) => {
        let errorCode = ''
        if (error.code === 'auth/invalid-verification-code') {
          errorCode = 'Invalid verification code'
        }
        setPhoneStatus((prev) => ({
          ...prev,
          isError: true,
          message: errorCode || error.message,
        }))
      },
    }
  )

  const onSubmit = async (data: any) => {
    if (PATH_CHECK) {
      onForgotPassword_(data.email)
    } else if (RESET_PATH_CHECK) {
      onConfirmResetPassword({
        newPassword: data.password,
        oobCode: localStorage.getItem('oobCode') as string,
      })
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

  //send otp
  const onSendOTP = async () => {
    if (!phone)
      return setPhoneStatus((prev) => ({
        ...prev,
        isError: true,
        message: `Mobile number wasn’t entered properly. Please try again`,
      }))

    onSendOTP_({ phone, setConfirmationObject })
  }

  //verify otp
  const onVerifyOTP = async () => {
    onVerifyOTP_({ confirmationObject, otp })
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
    onSendOTP_({
      phone,
      setConfirmationObject,
      setClearCaptcha: () =>
        setPhoneStatus((prev) => ({ ...prev, recaptcha: true })),
    })
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
