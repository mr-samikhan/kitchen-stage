import { firestore } from '@cookup/firebase'
import { calculateAgeRange } from '@cookup/helpers'
import { collection, getDocs } from 'firebase/firestore'
import { COLLECTIONS, getErrorMessage } from '@cookup/constant'

class Support {
  getSupportData = (type: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data: any = []
        const querySnapshot = await getDocs(
          collection(
            firestore,
            type === 'suspended-users' ? COLLECTIONS.USER : COLLECTIONS.SUPPORT
          )
        )
        if (type === 'personal' || type === 'reports' || type === 'resolved') {
          data = querySnapshot.docs.map((doc: any) => ({
            createdAt: doc?.data()?.createdAt,
            id: doc.id,
            requester: doc.data().requester,
            supportReason: doc.data().support_reason,
            supportDate: new Date(
              doc.data().requested_date.seconds * 1000
            ).toDateString(),
            reportedUserName: doc.data().reported_userName,
          }))
        }

        if (type === 'suspended-users') {
          data = querySnapshot.docs
            .filter((doc: any) => doc?.data()?.isSuspended)
            .map((doc: any) => ({
              id: doc.id,
              userName: `${doc.data().firstName} ${doc.data().lastName}`,
              email: doc.data().email,
              experience: doc.data().experience || 'N/A',
              city: doc.data().city,
              zipCode: `${doc.data().country}, ${doc.data().zipCode || ''}`,
            }))
        }

        resolve(data)
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  filterSupportData(
    data: any[] | undefined,
    expArray: string[],
    genderArray: string[],
    ageRangeArray: string[],
    businessTypeArray: string[]
  ) {
    return data?.filter((item_) => {
      return (
        expArray.length === 0 ||
        (expArray.every((criteria) => item_.experience === criteria) &&
          genderArray.every((criteria) => item_.gender === criteria) &&
          ageRangeArray.every(
            (criteria) => calculateAgeRange(item_?.dateOfBirth) === criteria
          )) ||
        businessTypeArray.every(
          (criteria) => calculateAgeRange(item_?.businessType) === criteria
        )
      )
    })
  }

  sortSupportData = (
    data: any[] | undefined,
    sortBy: string,
    sortOrder: string
  ) => {
    return data?.slice().sort((a, b) => {
      const getValue = (item: any, key: string) => {
        if (key === 'createdAt' && item[key]?.toDate) {
          return item[key].toDate() // Convert Firebase timestamp to JavaScript Date
        }
        return item[key] || '' // Return empty string if the key doesn't exist
      }

      const aValue = getValue(a, sortBy)
      const bValue = getValue(b, sortBy)

      if (sortOrder === 'ascending') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0
      }
    })
  }

  getSortKeys = (val: string) => {
    if (!val) return ''
    if (val === 'name') {
      return 'reportedUserName'
    } else if (val === 'createdAt') {
      return 'createdAt'
    }
  }
}

const SupportService = new Support()

export { SupportService }
