import axios from 'axios'
import { firestore } from '@cookup/firebase'
import { formatDateToToday } from '@cookup/helpers'
import { COLLECTIONS, getErrorMessage } from '@cookup/constant'
import {
  query,
  orderBy,
  getDocs,
  collection,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore'

interface IAdmin {
  uid: string
  email: string
  role: string
  status?: string
  userName: string
  lastLogin?: string
  phoneNumber?: string
}

interface UpdateAdmin {
  emailCheck: boolean
  data: IAdmin
}

class Admin {
  getAdmins = () => {
    return new Promise(async (resolve, reject) => {
      let admins: IAdmin[] | null = []
      try {
        const querySnapshot = await getDocs(
          query(
            collection(firestore, COLLECTIONS.ADMIN),
            orderBy('createdAt', 'desc')
          )
        )

        querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
          const data = doc.data() as IAdmin
          let admin = {
            userName: data.userName,
            email: data.email,
            role: data.role,
            uid: data.uid,
            status: data.status === 'active' ? 'Active' : 'Pending',
            ...doc.data(),
            lastLogin: formatDateToToday(data.lastLogin) || 'N/A',
          }
          admins?.push(admin)
        })

        resolve(admins)
      } catch (error) {
        reject(error)
      }
    })
  }

  updateAdmin = async (
    values: UpdateAdmin = {
      emailCheck: false,
      data: {
        uid: '',
        email: '',
        userName: '',
        role: '',
        phoneNumber: '',
      },
    }
  ) => {
    const { emailCheck, data } = values
    const { email, userName, role, uid, status, phoneNumber } = data || {}
    return new Promise(async (resolve, reject) => {
      try {
        if (emailCheck) {
          return reject('auth/email-already-in-use')
        }

        const { data } = await axios.post(
          'https://us-central1-kitchen-stage.cloudfunctions.net/updateAdmin',
          {
            email: email,
            role: role,
            userName: userName,
            id: uid,
            phoneNumber: phoneNumber || '',
          }
        )
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  addAdmin = async (
    values: any = {
      email: '',
      role: '',
      userName: '',
      status: 'pending',
    }
  ) => {
    const { email, role, userName, status } = values || {}
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(
          'https://us-central1-kitchen-stage.cloudfunctions.net/createAdmin',
          { email, role, userName, password: 'Abcd@123', status }
        )
        resolve(data)
      } catch (error) {
        const err = getErrorMessage(error)
        reject(err)
      }
    })
  }

  deleteAdmin = async (
    values: any = { uid: '', currentUser: '', role: '' }
  ) => {
    const { uid, currentUser, role } = values || {}
    return new Promise(async (resolve, reject) => {
      try {
        if (currentUser.role === 'Admin' && role === 'Super Admin') {
          reject('permission-error')
        } else {
          await axios.post(
            'https://us-central1-kitchen-stage.cloudfunctions.net/deleteAdmin',
            null,
            { params: { id: uid } }
          )
          resolve('user deleted successfully')
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  sendVerificationEmail = async (email: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        //using firebase function to send verification email
      } catch (error) {
        reject(error)
      }
    })
  }
}
const AdminService = new Admin()

export { AdminService }
