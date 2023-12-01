import * as yup from 'yup'
import { Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { VALIDATION_PATTERNS, VALIDATION_MESSAGES } from '@muc/constant'
import { ILoginFormResolver, IForgotPasswordFormResolver } from '@muc/types'

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
