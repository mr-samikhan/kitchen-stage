import { firestore } from '@cookup/firebase'
import { COLLECTIONS } from '@cookup/constant'
import { ImageService } from './images.services'
import { addDoc, collection } from 'firebase/firestore'

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
              fileName,
              fileSize,
              fileUrl: cover_img,
            },
          }
        )

        resolve(querySnapshot)
      } catch (error) {
        reject(error)
      }
    })
  }
}

const AdsService = new Ads()

export { AdsService }
