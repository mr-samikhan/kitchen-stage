import { AdminService } from './admins.services'
import { AuthService } from './auth.service'

const Api = {
  auth: {
    login: AuthService.login,
    checkEmailExists: AuthService.checkEmail,
    getCurrentUser: AuthService.getCurrentUser,
    forgotPassword: AuthService.forgotPassword,
    checkAdminStatus: AuthService.checkAdminStatus,
  },
  admin: {
    addAdmin: AdminService.addAdmin,
    getAdmins: AdminService.getAdmins,
    updateAdmin: AdminService.updateAdmin,
    deleteAdmin: AdminService.deleteAdmin,
  },
}
export { Api }
