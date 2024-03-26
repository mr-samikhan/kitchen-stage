import * as yup from 'yup'
import { Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { VALIDATION_PATTERNS, VALIDATION_MESSAGES } from '@cookup/constant'
import {
  ILoginFormResolver,
  IForgotPasswordFormResolver,
  IResetPasswordFormResolver,
} from '@cookup/types'

export const LoginFormResolver: any | Resolver<ILoginFormResolver> =
  yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .matches(VALIDATION_PATTERNS.EMAIL, VALIDATION_MESSAGES.INVALID_EMAIL)
        .required(VALIDATION_MESSAGES.REQUIRED_FIELD),

      password: yup
        .string()
        .matches(
          VALIDATION_PATTERNS.PASSWORD,
          VALIDATION_MESSAGES.INVALID_PASSWORD
        )
        .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    })
  )

export const ForgotPasswordFormResolver:
  | any
  | Resolver<IForgotPasswordFormResolver> = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .matches(VALIDATION_PATTERNS.EMAIL, VALIDATION_MESSAGES.INVALID_EMAIL)
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
  })
)
export const ResetPasswordFormResolver:
  | any
  | Resolver<IResetPasswordFormResolver> = yupResolver(
  yup.object().shape({
    password: yup
      .string()
      .matches(
        VALIDATION_PATTERNS.PASSWORD,
        VALIDATION_MESSAGES.INVALID_PASSWORD
      )
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], VALIDATION_MESSAGES.PASSWORD_MISMATCH)
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
  })
)

export const AdminsFormResolver: any | Resolver<ILoginFormResolver> =
  yupResolver(
    yup.object().shape({
      name: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),

      email: yup
        .string()
        .matches(
          VALIDATION_PATTERNS.EMAIL,
          'Email address invalid, please type again'
        )
        .required(VALIDATION_MESSAGES.REQUIRED_FIELD),

      role: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    })
  )

export const UserPasswordResetResolver: any | Resolver<ILoginFormResolver> =
  yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .matches(
          VALIDATION_PATTERNS.EMAIL,
          'Email address invalid, please type again'
        )
        .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
      userName: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
      phoneNumber: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    })
  )

export const EmailResolver: any | Resolver<any> = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .matches(
        VALIDATION_PATTERNS.EMAIL,
        'Email address invalid, please type again'
      )
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
  })
)

export const SuspendUserResolver: any | Resolver<any> = yupResolver(
  yup.object().shape({
    days: yup
      .number()
      .max(365, 'Days must be less than 365')
      .min(1, 'Days must be greater than 0')
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    reason: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
  })
)

export const SettingsFormResolver: any | Resolver<IResetPasswordFormResolver> =
  yupResolver(
    yup.object().shape({
      password: yup
        .string()
        .matches(
          VALIDATION_PATTERNS.PASSWORD,
          VALIDATION_MESSAGES.INVALID_PASSWORD
        )
        .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
      new_password: yup
        .string()
        .matches(
          VALIDATION_PATTERNS.PASSWORD,
          VALIDATION_MESSAGES.INVALID_PASSWORD
        )
        .required(VALIDATION_MESSAGES.REQUIRED_FIELD),

      confirmPassword: yup
        .string()
        .oneOf([yup.ref('new_password')], VALIDATION_MESSAGES.PASSWORD_MISMATCH)
        .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    })
  )

export const AdsFormResolver: any | Resolver<any> = yupResolver(
  yup.object().shape({
    adName: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    website: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    location: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    ageRange: yup.mixed().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    gender: yup.mixed().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    description: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    startDate: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    endDate: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    image: yup.object().required('Image is Required'),
  })
)

export const MusicFormResolver: any | Resolver<any> = yupResolver(
  yup.object().shape({
    title: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    artist: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    file: yup.mixed().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
  })
)
