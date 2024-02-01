import { AdsService } from './ads.services'
import { AuthService } from './auth.service'
import { UserService } from './user.services'
import { AdminService } from './admins.services'
import { ImageService } from './images.services'
import { SupportService } from './support.services'

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
  user: {
    getUser: UserService.getUser,
    getUsers: UserService.getUsers,
    sortUsers: UserService.sortUsers,
    updateUser: UserService.updateUser,
    deleteUser: UserService.deleteUser,
    filterUsers: UserService.filterUsers,
  },
  ads: {
    addAds: AdsService.addAds,
    getAds: AdsService.getAds,
    deleteAds: AdsService.deleteAds,
    saveDrafts: AdsService.saveDraft,
    duplicateAds: AdsService.duplicateAds,
  },
  support: {
    getSupports: SupportService.getSupportData,
  },
  image: {
    uploadImage: ImageService.uploadFile,
  },
}
export { Api }
