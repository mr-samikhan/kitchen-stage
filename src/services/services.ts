import { AuthService } from './auth.service'

const Api = {
  auth: {
    login: AuthService.login,
    getCurrentUser: AuthService.getCurrentUser,
    checkAdminStatus: AuthService.checkAdminStatus,
  },
}
export { Api }
