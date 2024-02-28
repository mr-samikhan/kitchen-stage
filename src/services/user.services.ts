import { firestore } from '@cookup/firebase'
import { COLLECTIONS, getErrorMessage } from '@cookup/constant'

import {
  doc,
  query,
  getDoc,
  orderBy,
  getDocs,
  updateDoc,
  collection,
  DocumentData,
  DocumentSnapshot,
  deleteDoc,
  where,
} from 'firebase/firestore'
import { calculateAgeRange, formatPhoneNumber } from '@cookup/helpers'
import { Api } from './services'

type IUser = {
  name: string
  city: string
  email: string
  zipCode: string
  lastName?: string
  country?: string
  gender?: string
  status?: string
  firstName?: string
  experience?: string
  dateOfBirth?: string
  phone?: string
}

class User {
  getUsers = async () => {
    return new Promise(async (resolve, reject) => {
      let users: IUser[] = []
      try {
        const querySnapshot = await getDocs(
          query(
            collection(firestore, COLLECTIONS.USER),
            orderBy('createdAt', 'desc')
          )
        )

        querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
          const data = doc.data() as IUser
          const name = `${data?.firstName || ''} ${data?.lastName || ''}`

          const user = {
            id: doc.id,
            name: name,
            email: data.email,
            city: data.city,
            gender: data?.gender || '',
            experience: data?.experience || '',
            dateOfBirth: data?.dateOfBirth || '',
            phone: formatPhoneNumber(data?.phone) || '',
            status: data.status === 'active' ? 'Active' : 'Pending',
            zipCode: `${data.country || ''}, ${data?.zipCode || ''}`,
            ...doc.data(),
          }
          users?.push(user)
        })

        resolve(users)
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  getUser = async (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await getDoc(doc(firestore, COLLECTIONS.USER, id))

        if (userDoc.exists()) {
          const userData = userDoc.data()

          let userUploadedRecipes: any = await Api.recipe.getRecipe(id)

          let allUsers: any = await Api.user.getUsers()
          let userLikes: any = []
          let userComments: any = []
          allUsers.map(
            (user: any) =>
              user.id ===
              userUploadedRecipes.map((recipe: any) =>
                recipe.likedBy.includes(user.id)
                  ? userLikes.push({ ...user, id: recipe.id })
                  : []
              )
          )
          allUsers.map(
            (user: any) =>
              user.id ===
              userUploadedRecipes.map((recipe: any) =>
                recipe.comments.map((comment: any) =>
                  comment.user === user.id
                    ? userComments.push({
                        time: '2 pm',
                        id: recipe.id,
                        comment: comment.comment,
                        userImage: user?.imageUrl || '',
                        totalLikes: recipe.likedBy.length,
                        userName: `${user.firstName} ${user.lastName}`,
                      })
                    : []
                )
              )
          )

          resolve({
            id: userDoc.id,
            ...userData,
            userUploadedRecipes,
            userLikes,
            userComments,
          })
        } else {
          throw new Error('user/not-found')
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     //single user
    //     const userDoc = await getDoc(doc(firestore, COLLECTIONS.USER, id))
    //     //get recipes
    //     const recipesRef = collection(firestore, 'recipes')
    //     //get all users data
    //     const usersRef = collection(firestore, 'users')
    //     if (userDoc.exists()) {
    //       //single user data
    //       const userData = userDoc.data()

    //       //get all users
    //       const userQuerySnapshot = await getDocs(usersRef)
    //       const users = userQuerySnapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
    //       }))

    //       //get all recipes
    //       const q = query(recipesRef, where('userId', '==', id))
    //       const querySnapshot = await getDocs(q)
    //       const recipes = querySnapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
    //         usersWIthLikes: users.map((user) =>
    //           doc.data().likedBy.includes(user.id) ? user : []
    //         ),
    //         usersWithComments: users.map((user: any) =>
    //           doc.data().comments.map((comment: any) =>
    //             comment.user === user.id
    //               ? {
    //                   comment: comment.comment,
    //                   userName: `${user.firstName} ${user.lastName}`,
    //                   userImage: user?.imageUrl || '',
    //                 }
    //               : []
    //           )
    //         ),
    //       }))

    //       resolve({
    //         id: userDoc.id,
    //         ...userData,
    //         recipes,
    //         users,
    //         likesLength: recipes.map((recipe: any) => recipe.likedBy.length),
    //       })
    //     } else {
    //       throw new Error('user/not-found')
    //     }
    //   } catch (error) {
    //     reject(error)
    //   }
    // })
  }

  updateUser = async (
    values = {
      id: '',
      data: {
        isSuspended: false,
      },
    }
  ) => {
    const { id, data } = values
    return new Promise(async (resolve, reject) => {
      try {
        await updateDoc(doc(firestore, COLLECTIONS.USER, id), { ...data })
        if (data?.isSuspended) {
          resolve('suspended')
        } else if (!data?.isSuspended) {
          resolve('unsuspended')
        } else {
          resolve('user/updated')
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  deleteUser = async (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = doc(firestore, COLLECTIONS.USER, id)
        await deleteDoc(docRef)
        resolve('User deleted successfully')
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  sortUsers = (users: any[] | undefined, sortBy: string, sortOrder: string) => {
    return users?.slice().sort((a, b) => {
      const aValue = sortBy ? a[sortBy] : a.name
      const bValue = sortBy ? b[sortBy] : b.name

      if (sortOrder === 'ascending') {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  }

  filterUsers(users: any[] | undefined, value: string) {
    if (!value) return users
    return users?.filter((user) => {
      if (value === 'Active Users') {
        return user.status === 'Active'
      } else if (value === 'Invited Users') {
        return user.status === 'Pending'
      } else if (value === 'Deactivated Users') {
        return user.status === 'Deactivated' || user.status === 'Suspended'
      }
      // expArray.length === 0 ||
      // (expArray.every((criteria) => user.experience === criteria) &&
      //   genderArray.every((criteria) => user.gender === criteria) &&
      //   ageRangeArray.every(
      //     (criteria) => calculateAgeRange(user?.dateOfBirth) === criteria
      //   )) ||
      // businessTypeArray.every(
      //   (criteria) => calculateAgeRange(user?.businessType) === criteria
      // )
    })
  }
}

const UserService = new User()

export { UserService }
