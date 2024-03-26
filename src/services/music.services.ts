import { getCurrentTime } from '@cookup/helpers'
import { COLLECTIONS, getErrorMessage } from '@cookup/constant'
import {
  ref,
  query,
  addDoc,
  storage,
  getDocs,
  firestore,
  collection,
  uploadBytes,
  getDownloadURL,
} from '@cookup/firebase'
import { deleteDoc, doc, orderBy, updateDoc } from 'firebase/firestore'

class Music {
  getMusics = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(firestore, COLLECTIONS.MUSIC),
            orderBy('createdAt', 'desc')
          )
        )
        const data: any[] = []
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() })
        })
        resolve(data)
      } catch (error) {
        console.error('Error getting documents:', error)
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  addMusic = async (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = await this.uploadFile(data.file, `musics/${data.file.name}`)
        const docRef = await addDoc(collection(firestore, COLLECTIONS.MUSIC), {
          createdAt: new Date(),
          title: data.title,
          artist: data.artist,
          time: getCurrentTime(),
          file: {
            name: data.file.name,
            url,
            size: data.file.size,
          },
        })
        resolve(docRef)
      } catch (error) {
        console.error('Error uploading file:', error)
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  updateMusic = async (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        let url_ = data.file.url || ''
        if (data.file.lastModified) {
          url_ = await this.uploadFile(data.file, `musics/${data.file.name}`)
        }
        const docRef = doc(firestore, COLLECTIONS.MUSIC, data.id)
        await updateDoc(docRef, {
          title: data.title,
          artist: data.artist,
          time: getCurrentTime(),
          file: {
            name: data.file.name,
            url: url_,
            size: data.file.size,
          },
        })
        resolve(docRef)
      } catch (error) {
        console.error('Error uploading file:', error)
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  deleteMusic = async (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        await deleteDoc(doc(firestore, COLLECTIONS.MUSIC, id))
        resolve('Document successfully deleted!')
      } catch (error) {
        console.error('Error removing document:', error)
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

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

const MusicService = new Music()

export { MusicService }
