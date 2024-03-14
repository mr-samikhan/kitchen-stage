import { Api } from './services'
import { firestore } from '@cookup/firebase'
import { formatPhoneNumber } from '@cookup/helpers'
import { COLLECTIONS, getErrorMessage } from '@cookup/constant'
import {
  doc,
  query,
  getDoc,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore'

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
  createdAt?: Date
  imageUrl?: string
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
            createdAt: data.createdAt,
            userImage: data?.imageUrl,
            // ...doc.data(),
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

          resolve({
            id: userDoc.id,
            ...userData,
            userUploadedRecipes,
          })
        } else {
          throw new Error('user/not-found')
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
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

  searchUsers = (users: any[] | undefined, value: string) => {
    if (!value) return users
    return users?.filter((user) => {
      return (
        user?.email?.toLowerCase().includes(value?.toLowerCase()) ||
        user?.phone?.toLowerCase().includes(value?.toLowerCase()) ||
        user?.name?.toLowerCase().includes(value?.toLowerCase()) ||
        user?.status?.toLowerCase().includes(value?.toLowerCase())
      )
    })
  }
}

const UserService = new User()

export { UserService }
