import { AdsService } from './ads.services'
import { AuthService } from './auth.service'
import { UserService } from './user.services'
import { AdminService } from './admins.services'
import { ImageService } from './images.services'
import { SupportService } from './support.services'
import { RecipeService } from './recipe.services'
import { Dashboard } from '@mui/icons-material'
import { DashboardService } from './dashboard.services'

const Api = {
  auth: {
    login: AuthService.login,
    sendOTP: AuthService.sendOTP,
    verifyOTP: AuthService.verifyOTP,
    checkEmailExists: AuthService.checkEmail,
    getCurrentUser: AuthService.getCurrentUser,
    forgotPassword: AuthService.forgotPassword,
    updateUserEmail: AuthService.updateUserEmail,
    checkAdminStatus: AuthService.checkAdminStatus,
    reAuthenticateUser: AuthService.reAuthenticateUser,
    confirmPasswordReset: AuthService.confirmPasswordReset,
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
    getSortKeys: SupportService.getSortKeys,
    getSupports: SupportService.getSupportData,
    sortSupportData: SupportService.sortSupportData,
    filterDataByType: SupportService.filterDataByType,
    filterSupportData: SupportService.filterSupportData,
  },
  image: {
    uploadImage: ImageService.uploadFile,
  },
  recipe: {
    getRecipe: RecipeService.getRecipe,
    getRecipes: RecipeService.getRecipes,
    getRcipeByType: RecipeService.getRcipeByType,
    removeLikedById: RecipeService.removeLikedById,
    getRecipesByDate: RecipeService.getRecipesByDate,
    removeCommentById: RecipeService.removeCommentById,
    getUserRecipeLikes: RecipeService.getUserRecipeLikes,
    getUserRecipeLikesAndComments: RecipeService.getUserRecipeLikesAndComments,
  },
  dashboard: {
    getAllCounters: DashboardService.getAllCounters,
  },
}
export { Api }
