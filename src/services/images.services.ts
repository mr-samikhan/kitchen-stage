import { getErrorMessage } from '@cookup/constant'
import { getDownloadURL, ref, storage, uploadBytes } from '@cookup/firebase'

class Image {
  uploadFile = async (file: any, path: string) => {
    try {
      const storageRef = ref(storage, path)
      const snapshot = await uploadBytes(storageRef, file)
      const url = await getDownloadURL(snapshot.ref)
      return url
    } catch (error) {
      console.error('Error uploading file:', error)
      const errorMessage = getErrorMessage(error)
      throw errorMessage
    }
  }
}

const ImageService = new Image()

export { ImageService }
