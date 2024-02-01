import { firestore } from '@cookup/firebase'
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
          data = querySnapshot.docs.map((doc: any) => ({
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
}

const SupportService = new Support()

export { SupportService }
