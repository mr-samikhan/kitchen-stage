import {
  auth,
  query,
  collection,
  firestore,
  signInWithEmailAndPassword,
} from '@cookup/firebase'
import { IUser } from '@cookup/redux'
import { getDocs, where } from 'firebase/firestore'

class Auth {
  login = async (data: any) => {
    const { email, password } = data || {}
    try {
      let adminData: IUser | any = null
      let { user } = await signInWithEmailAndPassword(auth, email, password)
      adminData = await this.checkAdminStatus(user)

      if (!adminData) {
        auth.signOut()
        throw new Error('auth/not-admin')
      } else {
        let userDetails = {
          uid: user.uid,
          email: user.email,
          type: adminData.type,
          userName: adminData.userName,
        }
        return { user: userDetails }
      }
    } catch (error) {
      throw error
    }
  }

  getCurrentUser = async (user: any) => {
    try {
      const q = query(
        collection(firestore, 'admins'),
        where('uid', '==', user.uid)
      )
      const querySnapshot = await getDocs(q)
      return { user: querySnapshot.docs[0].data() }
    } catch (error) {
      throw error
    }
  }

  checkAdminStatus = async (user: any) => {
    const q = query(
      collection(firestore, 'admins'),
      where('uid', '==', user.uid)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      throw new Error('auth/not-admin')
    } else {
      return querySnapshot.docs[0].data()
    }
  }
}
const AuthService = new Auth()

export { AuthService }
