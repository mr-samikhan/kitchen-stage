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
      .oneOf([yup.ref('password'), null], VALIDATION_MESSAGES.PASSWORD_MISMATCH)
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
  })
)

export const AdminsFormResolver: any | Resolver<ILoginFormResolver> =
  yupResolver(
    yup.object().shape({
      name: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),

      email: yup
        .string()
        .matches(VALIDATION_PATTERNS.EMAIL, VALIDATION_MESSAGES.INVALID_EMAIL)
        .required(VALIDATION_MESSAGES.REQUIRED_FIELD),

      role: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
    })
  )
