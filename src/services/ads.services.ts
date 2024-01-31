import { firestore } from '@cookup/firebase'
import { ImageService } from './images.services'
import { COLLECTIONS, getErrorMessage } from '@cookup/constant'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore'

class Ads {
  addAds = (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { file, fileName, fileSize } = data?.image || {}
        const cover_img = file
          ? await ImageService.uploadFile(file, `images/ads/${fileName}`)
          : ''

        const querySnapshot = await addDoc(
          collection(firestore, COLLECTIONS.AD),
          {
            ...data,
            createdAt: new Date(),
            image: {
              fileName: fileName || '',
              fileSize: fileSize || '',
              fileUrl: cover_img || data.image.fileUrl || '',
            },
          }
        )

        resolve(querySnapshot)
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  saveDraft = (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { file, fileName, fileSize } = data?.image || {}
        const cover_img = file
          ? await ImageService.uploadFile(file, `images/ads/${fileName}`)
          : ''

        const querySnapshot = await addDoc(
          collection(firestore, COLLECTIONS.DRAFT_ADS),
          {
            ...data,
            createdAt: new Date(),
            image: {
              fileName: fileName || '',
              fileSize: fileSize || '',
              fileUrl: cover_img || data.image.fileUrl || '',
            },
          }
        )

        resolve(querySnapshot)
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  getAds = (type: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const querySnapshot = await getDocs(
          collection(
            firestore,
            type === 'drafts' ? COLLECTIONS.DRAFT_ADS : COLLECTIONS.AD
          )
        )
        const currentDate = new Date()

        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        if (type === 'expired') {
          data = data.filter((ad: any) => {
            const endDate = new Date(ad.endDate)
            return endDate < currentDate
          })
        }
        if (type !== 'expired' && type !== 'drafts') {
          data = data.filter((ad: any) => {
            const endDate = new Date(ad.endDate)
            return endDate >= currentDate
          })
        }

        resolve(data)
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  deleteAds = async (values = { id: '', collectionName: '' }) => {
    const { id, collectionName } = values || {}
    console.log(collectionName)
    return new Promise(async (resolve, reject) => {
      try {
        await deleteDoc(doc(firestore, collectionName || COLLECTIONS.AD, id))
        resolve('deleted')
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  duplicateAds = (values: any = { data: '', collectionName: '' }) => {
    const { data, collectionName } = values || {}
    return new Promise(async (resolve, reject) => {
      try {
        const { fileName, fileSize } = data?.image || {}

        const querySnapshot = await setDoc(
          doc(firestore, collectionName || COLLECTIONS.AD, data.id),
          {
            ...data,
            createdAt: new Date(),
            image: {
              fileName: fileName || '',
              fileSize: fileSize || '',
              fileUrl: data.image.fileUrl || '',
            },
          }
        )

        resolve(querySnapshot)
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }
}

const AdsService = new Ads()

export { AdsService }
