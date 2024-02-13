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
} from 'firebase/firestore'
import { calculateAgeRange, formatPhoneNumber } from '@cookup/helpers'

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
            status: (data.status === 'active' && 'Active') || 'Pending',
            zipCode: `${data.country || ''}, ${data?.zipCode || ''}`,
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

          resolve({
            id: userDoc.id,
            ...userData,
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

  filterUsers(
    users: any[] | undefined,
    expArray: string[],
    genderArray: string[],
    ageRangeArray: string[],
    businessTypeArray: string[]
  ) {
    return users?.filter((user) => {
      return (
        expArray.length === 0 ||
        (expArray.every((criteria) => user.experience === criteria) &&
          genderArray.every((criteria) => user.gender === criteria) &&
          ageRangeArray.every(
            (criteria) => calculateAgeRange(user?.dateOfBirth) === criteria
          )) ||
        businessTypeArray.every(
          (criteria) => calculateAgeRange(user?.businessType) === criteria
        )
      )
    })
  }
}

const UserService = new User()

export { UserService }
