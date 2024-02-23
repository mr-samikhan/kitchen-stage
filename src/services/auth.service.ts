import { IUser } from '@cookup/redux'
import { EmailAuthProvider } from 'firebase/auth/cordova'
import { COLLECTIONS, getErrorMessage } from '@cookup/constant'
import { doc, getDocs, updateDoc, where } from 'firebase/firestore'
import {
  auth,
  query,
  collection,
  firestore,
  signInWithEmailAndPassword,
} from '@cookup/firebase'
import {
  getAuth,
  updateEmail,
  updatePassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  reauthenticateWithCredential,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  linkWithCredential,
} from 'firebase/auth'

class Auth {
  login = async (data: any) => {
    const { email, password } = data || {}
    try {
      let adminData: IUser | any = null
      let { user } = await signInWithEmailAndPassword(auth, email, password)
      console.log('>>>user', user)
      await updateDoc(doc(firestore, COLLECTIONS.ADMIN, user.uid), {
        lastLogin: user.metadata.lastSignInTime,
      })

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
      return { user: querySnapshot?.docs[0]?.data() }
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

  checkEmail = async (email: string) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email)
      console.log(methods)
      if (methods.length === 0) {
        throw Error('auth/email-not-found')
      } else {
        return { message: 'Email sent successfully' }
      }
    } catch (error) {
      return error
    }
  }

  forgotPassword = async (email: string) => {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve({ message: 'Email sent successfully' })
        })
        .catch((error) => {
          const err = getErrorMessage(error)
          reject(err)
        })
    })
  }

  confirmPasswordReset = async (values = { oobCode: '', newPassword: '' }) => {
    const { oobCode, newPassword } = values || {}
    return new Promise(async (resolve, reject) => {
      try {
        if (!oobCode && !newPassword) return

        resolve(await confirmPasswordReset(auth, oobCode, newPassword))
      } catch (error) {
        reject(error)
      }
    })
  }

  reAuthenticateUser = async (
    values = { currentPassword: '', newPassword: '', email: '' }
  ) => {
    return new Promise(async (resolve, reject) => {
      const { currentPassword, newPassword, email } = values || {}
      try {
        const auth = getAuth()
        const user = auth.currentUser
        if (!user) throw new Error('No user is currently signed in.')

        const credentials = EmailAuthProvider.credential(email, currentPassword)
        await reauthenticateWithCredential(user, credentials)

        await updatePassword(user, newPassword)
        resolve('Password updated successfully.')
      } catch (error) {
        reject(error)
      }
    })
  }

  updateUserEmail = async (values = { newEmail: '' }) => {
    const { newEmail } = values || {}
    return new Promise(async (resolve, reject) => {
      try {
        const auth = getAuth()
        const user = auth.currentUser

        if (user) {
          try {
            await updateEmail(user, newEmail)
            resolve('Email updated successfully.')
          } catch (error) {
            reject(error)
            console.error('Error updating email:', error)
          }
        } else {
          console.log('No user is currently signed in.')
          reject('No user is currently signed in.')
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  //2FA

  //send otp
  sendOTP = async (
    values: any = {
      phone: '',
      setConfirmationObject: () => {},
      setClearCaptcha: () => {},
    }
  ) => {
    return new Promise(async (resolve, reject) => {
      const { phone, setConfirmationObject, setClearCaptcha } = values || {}
      try {
        const recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {}
        )
        const phoneNumberWithCountryCode = '+' + phone
        const appVerifier = recaptchaVerifier

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumberWithCountryCode,
          appVerifier
        )
        // console.log('>>>confirmationResult', confirmationResult)
        setConfirmationObject(confirmationResult)
        if (setClearCaptcha) {
          setClearCaptcha(true)
        }
        resolve('OTP sent successfully.')
      } catch (error) {
        reject(error)
      }
    })
  }

  //verify otp
  verifyOTP = async (values: any = { confirmationObject: '', otp: '' }) => {
    return new Promise(async (resolve, reject) => {
      const { confirmationObject, otp } = values || {}
      let currentUser: any = auth.currentUser
      try {
        let credential = PhoneAuthProvider.credential(
          confirmationObject.verificationId,
          otp.replace(/-/g, '')
        )
        const userCreds = await linkWithCredential(currentUser, credential)
        const user = userCreds.user
        console.log('>>>user', user)
        resolve('Phone number linked')
      } catch (error) {
        reject(error)
      }
    })
  }
}
const AuthService = new Auth()

export { AuthService }
