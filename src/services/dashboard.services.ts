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

//get today
const today = new Date()
today.setHours(0, 0, 0, 0)

class Dashboard {
  getAllAnalytics = async () => {
    return new Promise(async (resolve, reject) => {
      const totalRecipesQuery = query(collection(firestore, 'recipes'))
      const totalRecipesSnapshot = await getDocs(totalRecipesQuery)
      const totalRecipesCount = totalRecipesSnapshot.docs.length

      //today's recipes
      const todayRecipesQuery = query(
        collection(firestore, 'recipes'),
        where('createdAt', '>=', today)
      )
      const todayRecipesSnapshot = await getDocs(todayRecipesQuery)

      //monthly recipes
      const monthlyRecipesQuery = query(
        collection(firestore, 'recipes'),
        where(
          'createdAt',
          '>=',
          new Date(today.getFullYear(), today.getMonth(), 1)
        )
      )
      const monthlyRecipesSnapshot = await getDocs(monthlyRecipesQuery)

      // This week's recipes
      const thisWeekQuery = query(
        collection(firestore, 'recipes'),
        where('createdAt', '>=', firstDayOfWeek),
        where('createdAt', '<=', lastDayOfWeek)
      )
      const thisWeekSnapshot = await getDocs(thisWeekQuery)
      const thisWeekCount = thisWeekSnapshot.docs.length

      // Last week's recipes
      const lastWeekQuery = query(
        collection(firestore, 'recipes'),
        where('createdAt', '>=', firstDayOfLastWeek),
        where('createdAt', '<=', lastDayOfLastWeek)
      )
      const lastWeekSnapshot = await getDocs(lastWeekQuery)
      const lastWeekCount = lastWeekSnapshot.docs.length
      let percentageChange = 0
      if (lastWeekCount > 0) {
        percentageChange =
          ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100
      } else if (thisWeekCount > 0) {
        percentageChange = 100
      }

      // Initialize comments count
      let thisWeekCommentsCount = 0
      let lastWeekCommentsCount = 0

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
      let commentsPercentageChange = 0
      if (lastWeekCommentsCount > 0) {
        commentsPercentageChange =
          ((thisWeekCommentsCount - lastWeekCommentsCount) /
            lastWeekCommentsCount) *
          100
      } else if (thisWeekCommentsCount > 0) {
        commentsPercentageChange = 100 // If there were no comments last week but some this week, consider it as 100% increase
      }

      // Initialize likes count
      let thisWeekLikesCount = 0
      let lastWeekLikesCount = 0

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
      let likesPercentageChange = 0
      if (lastWeekLikesCount > 0) {
        likesPercentageChange =
          ((thisWeekLikesCount - lastWeekLikesCount) / lastWeekLikesCount) * 100
      } else if (thisWeekLikesCount > 0) {
        likesPercentageChange = 100 // If there were no likes last week but some this week, consider it as 100% increase
      }

      // New users this week
      const thisWeekUsersQuery = query(
        collection(firestore, 'users'),
        where('createdAt', '>=', firstDayOfWeek),
        where('createdAt', '<=', lastDayOfWeek)
      )
      const thisWeekUsersSnapshot = await getDocs(thisWeekUsersQuery)
      const thisWeekNewUsersCount = thisWeekUsersSnapshot.docs.length

      // New users last week
      const lastWeekUsersQuery = query(
        collection(firestore, 'users'),
        where('createdAt', '>=', firstDayOfLastWeek),
        where('createdAt', '<=', lastDayOfLastWeek)
      )
      const lastWeekUsersSnapshot = await getDocs(lastWeekUsersQuery)
      const lastWeekNewUsersCount = lastWeekUsersSnapshot.docs.length

      // Query to get the total number of users
      const totalUsersQuery = query(collection(firestore, 'users'))
      const totalUsersSnapshot = await getDocs(totalUsersQuery)
      const totalUsersCount = totalUsersSnapshot.docs.length

      // Query to get the number of active users
      const activeUsersQuery = query(
        collection(firestore, 'users'),
        where('status', '==', 'active')
      )
      const activeUsersSnapshot = await getDocs(activeUsersQuery)
      const activeUsersCount = activeUsersSnapshot.docs.length

      // Query to get the number of deactivated users
      const deactivatedUsersQuery = query(
        collection(firestore, 'users'),
        where('status', '!=', 'active')
      )
      const deactivatedUsersSnapshot = await getDocs(deactivatedUsersQuery)
      const deactivatedUsersCount = deactivatedUsersSnapshot.docs.length

      // New users this week
      const thisWeekActiveUsersQuery = query(
        collection(firestore, 'users'),
        where('status', '==', 'active'),
        where('createdAt', '>=', firstDayOfWeek),
        where('createdAt', '<=', lastDayOfWeek)
      )
      const thisWeekActiveUsersSnapshot = await getDocs(
        thisWeekActiveUsersQuery
      )
      const thisWeekActiveUsersCount = thisWeekActiveUsersSnapshot.docs.length

      resolve({
        totalRecipesCount,
        thisWeekCount,
        lastWeekCount,
        percentageChange, // For recipes
        thisWeekCommentsCount,
        lastWeekCommentsCount,
        commentsPercentageChange, // For comments
        thisWeekLikesCount,
        lastWeekLikesCount,
        likesPercentageChange, // For likes
        thisWeekNewUsersCount,
        lastWeekNewUsersCount,
        newUsersPercentageChange:
          ((thisWeekNewUsersCount - lastWeekNewUsersCount) /
            (lastWeekNewUsersCount || 1)) *
          100,
        totalUsersCount, // Total number of users in the users collection
        activeUsersCount, // Number of active users
        deactivatedUsersCount, // Number of deactivated users
        monthlyRecipesSnapshot: monthlyRecipesSnapshot.docs.length,
        todayRecipesSnapshot: todayRecipesSnapshot.docs.length,
        thisWeekActiveUsersCount,
      })
      try {
      } catch (error) {
        reject(getErrorMessage(error))
      }
    })
  }

  getAllCounters = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let lastWeekDeactiveUsersCount = 0
        let thisWeekDeactiveUsersCount = 0

        let thisWeekActiveUsersCount = 0
        let lastWeekActiveUsersCount = 0

        const activeUsersQuery = query(
          collection(firestore, 'users'),
          where('status', '==', 'active')
        )
        const activeUsersSnapshot = await getDocs(activeUsersQuery)
        const activeUsersCount = activeUsersSnapshot.docs.length

        const deactivatedUsersQuery = query(
          collection(firestore, 'users'),
          where('status', '!=', 'active')
        )
        const deactivatedUsersSnapshot = await getDocs(deactivatedUsersQuery)
        const deactivatedUsersCount = deactivatedUsersSnapshot.docs.length

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

        if (deactivatedUsersCount > 0) {
          //this week deactive users
          const thisWeekDeactiveUsersQuery = query(
            collection(firestore, 'users'),
            where('status', '!=', 'active'),
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
            where('status', '!=', 'active'),
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

        const totalRecipesQuery = query(collection(firestore, 'recipes'))
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

        let thisWeekCommentsCount = 0
        let lastWeekCommentsCount = 0

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
        let thisWeekLikesCount = 0
        let lastWeekLikesCount = 0

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
          recipePercenatgeChange,
          thisWeekCommentsCount,
          lastWeekCommentsCount,
          commentsPercentageChange,
          thisWeekLikesCount,
          lastWeekLikesCount,
          likesPercentageChange,
          //recipes end
          lastWeekActiveUsersCount,
          thisWeekActiveUsersCount,
          activeUsersCount,
          deactivatedUsersCount,
          thisWeekDeactiveUsersCount,
          lastWeekDeactiveUsersCount,
          activePercentageChange: activePercentageChange,
          deactivePercentageChange: deactivePercentageChange,
        })
      } catch (error) {
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
    return Number(activePercentageChange.toFixed(2)) || 0
  }
}

const DashboardService = new Dashboard()

export { DashboardService }
