export type ILoginFormResolver = {
  email: string | undefined
  password: string | undefined
}

export type IForgotPasswordFormResolver = {
  email: string | undefined
}

export type IResetPasswordFormResolver = {
  password: string
  confirmPassword: string
}

export type ISortItem = {
  value: string
  title: string
}
