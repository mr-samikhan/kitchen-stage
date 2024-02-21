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
  type: string
  value: string
  title: string
}

export type IAdminsFormResolver = {
  name: string
  email: string
  role: string
}

export type IUserEmailresolver = {
  email: string
}
