import { COLLECTIONS, getErrorMessage } from '@cookup/constant'
import {
  auth,
  createUserWithEmailAndPassword,
  firestore,
} from '@cookup/firebase'
import {
  DocumentData,
  DocumentSnapshot,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

interface IAdmin {
  uid: string
  email: string
  userName: string
  role: string
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
          collection(firestore, COLLECTIONS.ADMIN)
        )

        querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
          const data = doc.data() as IAdmin
          let admin = {
            userName: data.userName,
            email: data.email,
            role: data.role,
            uid: data.uid,
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
      },
    }
  ) => {
    const { emailCheck, data } = values
    return new Promise(async (resolve, reject) => {
      try {
        if (emailCheck) {
          return reject('auth/email-already-in-use')
        }
        resolve(
          await updateDoc(doc(firestore, COLLECTIONS.ADMIN, data.uid), {
            ...data,
          })
        )
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
    }
  ) => {
    const { email, role } = values || {}
    return new Promise(async (resolve, reject) => {
      try {
        const createdUser = await createUserWithEmailAndPassword(
          auth,
          email,
          'Abcd@123'
        )

        const user = {
          role,
          createdAt: new Date(),
          uid: createdUser.user.uid,
          email: createdUser.user.email,
          userName: createdUser?.user?.email?.split('@')[0],
        }

        const docRef = await setDoc(
          doc(firestore, COLLECTIONS.ADMIN, createdUser?.user?.uid),
          { ...user }
        )
        resolve(docRef)
      } catch (error) {
        const err = getErrorMessage(error)
        reject(err)
      }
    })
  }
}
const AdminService = new Admin()

export { AdminService }
