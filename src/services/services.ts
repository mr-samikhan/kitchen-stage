import { AuthService } from './auth.service'

const Api = {
  auth: {
    login: AuthService.login,
    checkEmailExists: AuthService.checkEmail,
    getCurrentUser: AuthService.getCurrentUser,
    forgotPassword: AuthService.forgotPassword,
    checkAdminStatus: AuthService.checkAdminStatus,
  },
}
export { Api }
