import { getErrorMessage } from '@cookup/constant'
import {
  collection,
  firestore,
  getDocs,
  getDownloadURL,
  query,
  ref,
  storage,
  uploadBytes,
} from '@cookup/firebase'
import { where } from 'firebase/firestore'

const now = new Date()
const firstDayOfWeek = new Date(
  now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1))
) // Adjusting to start the week on Monday
firstDayOfWeek.setHours(0, 0, 0, 0)

const lastDayOfWeek = new Date(firstDayOfWeek)
lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)
lastDayOfWeek.setHours(23, 59, 59, 999)

const firstDayOfLastWeek = new Date(firstDayOfWeek)
firstDayOfLastWeek.setDate(firstDayOfLastWeek.getDate() - 7)

const lastDayOfLastWeek = new Date(lastDayOfWeek)
lastDayOfLastWeek.setDate(lastDayOfLastWeek.getDate() - 7)

// Get today's date at midnight (start of the day)
const todayStart: any = new Date()
todayStart.setHours(0, 0, 0, 0)

// Get today's date at 23:59:59.999 (end of the day)
const todayEnd: any = new Date()
todayEnd.setHours(23, 59, 59, 999)

// Get the first day of the month
const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

// Get the last day of the month
const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

class Dashboard {
  getAllCounters = async ({
    interval,
    startDate,
    endDate,
  }: {
    interval: string
    startDate: Date
    endDate: Date
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let lastWeekDeactiveUsersCount = 0
        let thisWeekDeactiveUsersCount = 0

        let thisWeekActiveUsersCount = 0
        let lastWeekActiveUsersCount = 0

        let totalFollowedBy: any = 0
        let thisWeekFollowedBy: any = 0
        let lastWeekFollowedBy: any = 0

        let totalUsersQuery: any

        if (interval === 'today') {
          totalUsersQuery = query(
            collection(firestore, 'users'),
            where('createdAt', '>=', todayStart),
            where('createdAt', '<=', todayEnd)
          )
        }
        if (interval === 'lastWeek') {
          totalUsersQuery = query(
            collection(firestore, 'users'),
            where('createdAt', '>=', firstDayOfWeek),
            where('createdAt', '<=', lastDayOfWeek)
          )
        }
        if (interval === 'lastMonth') {
          totalUsersQuery = query(
            collection(firestore, 'users'),
            where('createdAt', '>=', firstDayOfMonth),
            where('createdAt', '<=', lastDayOfMonth)
          )
        }
        if (interval === '') {
          totalUsersQuery = query(collection(firestore, 'users'))
        }
        let totalFollowedByRange = 0
        if (interval === '' && startDate && endDate) {
          const allUsersForDateRangeQuery = query(
            collection(firestore, 'users'),
            where('createdAt', '>=', startDate),
            where('createdAt', '<=', endDate)
          )

          const allUsersForDateRangeSnapshot = await getDocs(
            allUsersForDateRangeQuery
          )
          const allUsersForDateRangeCount =
            allUsersForDateRangeSnapshot.docs.length || 0
          //followedBy
          allUsersForDateRangeSnapshot?.docs?.forEach((doc) => {
            const user: any = doc.data()
            if (user.followedBy && Array.isArray(user.followedBy)) {
              totalFollowedByRange += user.followedBy.length
            }
          })
        }

        const totalUsersSnapshot = await getDocs(totalUsersQuery)
        const totalUsersCount = totalUsersSnapshot?.docs?.length || 0

        //followedBy
        totalUsersSnapshot?.docs?.forEach((doc) => {
          const user: any = doc.data()
          if (user.followedBy && Array.isArray(user.followedBy)) {
            totalFollowedBy += user.followedBy.length
          }
        })

        //get this week and last week followedBy
        const thisWeekUsersQuery = query(
          collection(firestore, 'users'),
          where('createdAt', '>=', firstDayOfWeek),
          where('createdAt', '<=', lastDayOfWeek)
        )
        const thisWeekUsersSnapshot = await getDocs(thisWeekUsersQuery)
        thisWeekUsersSnapshot.docs.forEach((doc) => {
          const user = doc.data()
          if (user.followedBy && Array.isArray(user.followedBy)) {
            thisWeekFollowedBy += user.followedBy.length
          }
        })

        //percentage change in followedBy
        const followedByPercentageChange = this.calculatePercentageChange(
          thisWeekFollowedBy,
          lastWeekFollowedBy,
          totalFollowedBy
        )

        const lastWeekUsersQuery = query(
          collection(firestore, 'users'),
          where('createdAt', '>=', firstDayOfLastWeek),
          where('createdAt', '<=', lastDayOfLastWeek)
        )
        const lastWeekUsersSnapshot = await getDocs(lastWeekUsersQuery)
        lastWeekUsersSnapshot.docs.forEach((doc) => {
          const user = doc.data()
          if (user.followedBy && Array.isArray(user.followedBy)) {
            lastWeekFollowedBy += user.followedBy.length
          }
        })
        let activeUsersQuery: any

        if (interval === 'today') {
          activeUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'active'),
            where('createdAt', '>=', todayStart),
            where('createdAt', '<=', todayEnd)
          )
        }

        if (interval === 'lastWeek') {
          activeUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'active'),
            where('createdAt', '>=', firstDayOfLastWeek),
            where('createdAt', '<=', lastDayOfLastWeek)
          )
        }

        if (interval === 'lastMonth') {
          activeUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'active'),
            where('createdAt', '>=', firstDayOfMonth),
            where('createdAt', '<=', lastDayOfMonth)
          )
        }

        if (interval === '') {
          activeUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'active')
          )
        }
        let allActiveUsersCount = 0
        if (interval === '' && startDate && endDate) {
          const allActiveUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'active'),
            where('createdAt', '>=', startDate),
            where('createdAt', '<=', endDate)
          )
          const allActiveUsersSnapshot = await getDocs(allActiveUsersQuery)
          allActiveUsersCount = allActiveUsersSnapshot.docs.length || 0
        }

        const checkActiveUserQUery = query(
          collection(firestore, 'users'),
          where('status', '==', 'active')
        )
        const checkActiveUserSnapshot = await getDocs(checkActiveUserQUery)
        const checkActiveUserCount = checkActiveUserSnapshot.docs.length || 0

        const activeUsersSnapshot =
          checkActiveUserCount > 0 ? await getDocs(activeUsersQuery) : null
        const activeUsersCount = activeUsersSnapshot?.docs?.length || 0

        if (activeUsersCount > 0) {
          // This week's active users
          const thisWeekActiveUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'active'),
            where('createdAt', '>=', firstDayOfWeek),
            where('createdAt', '<=', lastDayOfWeek)
          )
          const thisWeekActiveUsersSnapshot = await getDocs(
            thisWeekActiveUsersQuery
          )
          thisWeekActiveUsersCount = thisWeekActiveUsersSnapshot.docs.length

          // previous week's active users
          const lastWeekActiveUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'active'),
            where('createdAt', '>=', firstDayOfLastWeek),
            where('createdAt', '<=', lastDayOfLastWeek)
          )
          const lastWeekActiveUsersSnapshot = await getDocs(
            lastWeekActiveUsersQuery
          )
          lastWeekActiveUsersCount = lastWeekActiveUsersSnapshot.docs.length
        }

        let checkDeactiveUsersQuery: any
        checkDeactiveUsersQuery = query(
          collection(firestore, 'users'),
          where('status', '==', 'inActive' || 'deactivated' || 'pending')
        )
        const checkDeactiveUsersSnapshot = await getDocs(
          checkDeactiveUsersQuery
        )
        const checkDeactiveUsersCount =
          checkDeactiveUsersSnapshot.docs.length || 0
        let deactivatedUsersQuery: any

        deactivatedUsersQuery = query(
          collection(firestore, 'users'),
          where('status', '==', 'InActive' || 'deactivated' || 'pending')
        )

        if (interval === 'today') {
          deactivatedUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'InActive' || 'deactivated' || 'pending'),
            where('createdAt', '>=', todayStart),
            where('createdAt', '<=', todayEnd)
          )
        }

        if (interval === 'lastWeek') {
          deactivatedUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'InActive' || 'deactivated' || 'pending'),
            where('createdAt', '>=', firstDayOfLastWeek),
            where('createdAt', '<=', lastDayOfLastWeek)
          )
        }

        if (interval === 'lastMonth') {
          deactivatedUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'InActive' || 'deactivated' || 'pending'),
            where('createdAt', '>=', firstDayOfMonth),
            where('createdAt', '<=', lastDayOfMonth)
          )
        }

        if (interval === '') {
          deactivatedUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'InActive' || 'deactivated' || 'pending')
          )
        }

        let allInActiveUsersCount = 0
        if (interval === '' && startDate && endDate) {
          const allInActiveUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'InActive' || 'deactivated' || 'pending'),
            where('createdAt', '>=', startDate),
            where('createdAt', '<=', endDate)
          )
          const allInActiveUsersSnapshot = await getDocs(allInActiveUsersQuery)
          allInActiveUsersCount = allInActiveUsersSnapshot.docs.length || 0
        }
        const deactivatedUsersSnapshot = await getDocs(deactivatedUsersQuery)
        const deactivatedUsersCount =
          deactivatedUsersSnapshot?.docs?.length || 0

        if (deactivatedUsersCount > 0) {
          //this week deactive users
          const thisWeekDeactiveUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'InActive' || 'deactivated' || 'pending'),
            where('createdAt', '>=', firstDayOfWeek),
            where('createdAt', '<=', lastDayOfWeek)
          )
          const thisWeekDeactiveUsersSnapshot = await getDocs(
            thisWeekDeactiveUsersQuery
          )
          thisWeekDeactiveUsersCount = thisWeekDeactiveUsersSnapshot.docs.length

          // previous week deactive users
          const lastWeekDeactiveUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '==', 'InActive' || 'deactivated' || 'pending'),
            where('createdAt', '>=', firstDayOfLastWeek),
            where('createdAt', '<=', lastDayOfLastWeek)
          )
          const lastWeekDeactiveUsersSnapshot = await getDocs(
            lastWeekDeactiveUsersQuery
          )
          lastWeekDeactiveUsersCount = lastWeekDeactiveUsersSnapshot.docs.length
        }

        // Calculate the percentage change in active users
        const activePercentageChange = this.calculatePercentageChange(
          thisWeekActiveUsersCount,
          lastWeekActiveUsersCount,
          activeUsersCount
        )

        // Calculate the percentage change in deactive users
        const deactivePercentageChange = this.calculatePercentageChange(
          thisWeekDeactiveUsersCount,
          lastWeekDeactiveUsersCount,
          deactivatedUsersCount
        )

        //recipes

        let totalRecipesQuery: any
        if (interval === 'today') {
          totalRecipesQuery = query(
            collection(firestore, 'recipes'),
            where('createdAt', '>=', todayStart),
            where('createdAt', '<=', todayEnd)
          )
        }

        if (interval === 'lastWeek') {
          totalRecipesQuery = query(
            collection(firestore, 'recipes'),
            where('createdAt', '>=', firstDayOfWeek),
            where('createdAt', '<=', lastDayOfWeek)
          )
        }

        if (interval === 'lastMonth') {
          totalRecipesQuery = query(
            collection(firestore, 'recipes'),
            where('createdAt', '>=', firstDayOfMonth),
            where('createdAt', '<=', lastDayOfMonth)
          )
        }

        if (interval === '') {
          totalRecipesQuery = query(collection(firestore, 'recipes'))
        }

        if (interval === '' && startDate && endDate) {
          totalRecipesQuery = query(
            collection(firestore, 'recipes'),
            where('createdAt', '>=', startDate),
            where('createdAt', '<=', endDate)
          )
        }

        const totalRecipesSnapshot = await getDocs(totalRecipesQuery)
        const totalRecipesCount = totalRecipesSnapshot.docs.length

        //this week's recipes
        const thisWeekQuery = query(
          collection(firestore, 'recipes'),
          where('createdAt', '>=', firstDayOfWeek),
          where('createdAt', '<=', lastDayOfWeek)
        )

        const thisWeekSnapshot = await getDocs(thisWeekQuery)
        const thisWeekRecipes = thisWeekSnapshot.docs.length

        //last week's recipes
        const lastWeekQuery = query(
          collection(firestore, 'recipes'),
          where('createdAt', '>=', firstDayOfLastWeek),
          where('createdAt', '<=', lastDayOfLastWeek)
        )

        const lastWeekSnapshot = await getDocs(lastWeekQuery)
        const lastWeekRecipes = lastWeekSnapshot.docs.length

        //percentage change in recipes
        let recipePercenatgeChange = this.calculatePercentageChange(
          thisWeekRecipes,
          lastWeekRecipes,
          totalRecipesCount
        )

        //comments
        let totalComments = 0
        let thisWeekCommentsCount = 0
        let lastWeekCommentsCount = 0

        //total comments
        totalRecipesSnapshot.docs.forEach((doc) => {
          const recipe: any = doc.data()
          if (recipe.comments && Array.isArray(recipe.comments)) {
            totalComments += recipe.comments.length
          }
        })

        // Count comments for this week's recipes
        thisWeekSnapshot.docs.forEach((doc) => {
          const recipe = doc.data()
          if (recipe.comments && Array.isArray(recipe.comments)) {
            thisWeekCommentsCount += recipe.comments.length
          }
        })

        // Count comments for last week's recipes
        lastWeekSnapshot.docs.forEach((doc) => {
          const recipe = doc.data()
          if (recipe.comments && Array.isArray(recipe.comments)) {
            lastWeekCommentsCount += recipe.comments.length
          }
        })

        // Calculate the percentage change in comments
        let commentsPercentageChange = this.calculatePercentageChange(
          thisWeekCommentsCount,
          lastWeekCommentsCount,
          totalRecipesCount
        )

        //likes
        let totalLikesCount = 0
        let thisWeekLikesCount = 0
        let lastWeekLikesCount = 0

        //total likes
        totalRecipesSnapshot.docs.forEach((doc) => {
          const recipe: any = doc.data()
          if (recipe.likedBy && Array.isArray(recipe.likedBy)) {
            totalLikesCount += recipe.likedBy.length
          }
        })

        // Count likes for this week's recipes
        thisWeekSnapshot.docs.forEach((doc) => {
          const recipe = doc.data()
          if (recipe.likedBy && Array.isArray(recipe.likedBy)) {
            thisWeekLikesCount += recipe.likedBy.length
          }
        })

        // Count likes for last week's recipes
        lastWeekSnapshot.docs.forEach((doc) => {
          const recipe = doc.data()
          if (recipe.likedBy && Array.isArray(recipe.likedBy)) {
            lastWeekLikesCount += recipe.likedBy.length
          }
        })

        // Calculate the percentage change in likes
        let likesPercentageChange = this.calculatePercentageChange(
          thisWeekLikesCount,
          lastWeekLikesCount,
          totalRecipesCount
        )

        //end recipes

        resolve({
          //recipes
          totalRecipesCount,
          thisWeekRecipes,
          lastWeekRecipes,
          totalComments,
          recipePercenatgeChange,
          thisWeekCommentsCount,
          lastWeekCommentsCount,
          commentsPercentageChange,
          thisWeekLikesCount,
          lastWeekLikesCount,
          likesPercentageChange,
          totalLikesCount,
          //recipes end
          lastWeekActiveUsersCount,
          thisWeekActiveUsersCount,
          activeUsersCount:
            startDate && endDate ? allActiveUsersCount : activeUsersCount,
          totalUsersCount,
          deactivatedUsersCount:
            startDate && endDate
              ? allInActiveUsersCount
              : deactivatedUsersCount,
          thisWeekDeactiveUsersCount,
          lastWeekDeactiveUsersCount,
          activePercentageChange: activePercentageChange,
          deactivePercentageChange: deactivePercentageChange,
          //followedBy
          totalFollowedBy:
            startDate && endDate ? totalFollowedByRange : totalFollowedBy,
          thisWeekFollowedBy,
          lastWeekFollowedBy,
          followedByPercentageChange,
        })
      } catch (error) {
        console.log(error, 'error')
        reject(getErrorMessage(error))
      }
    })
  }

  calculatePercentageChange = (
    currentWeekCount: any,
    previousWeekCount: any,
    activeUsersCount: any
  ) => {
    let combineRes = previousWeekCount + currentWeekCount

    let activePercentageChange = (combineRes / activeUsersCount) * 100
    return activePercentageChange === Infinity || isNaN(activePercentageChange)
      ? 0
      : activePercentageChange.toFixed(2)
  }
}

const DashboardService = new Dashboard()

export { DashboardService }
