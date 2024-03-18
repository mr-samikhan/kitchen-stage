import * as admins from 'firebase-admin'
import * as functions from 'firebase-functions'
import { Storage } from '@google-cloud/storage'

export const RemoveDeletedFile = () =>
  functions.storage.object().onDelete(async (object: any) => {
    const storage = new Storage()
    const filePath = object.name // The full path of the deleted file
    const contentType = object.contentType // The content type of the deleted file

    // Proceed only if the deleted file is a video
    if (!contentType.startsWith('video/')) {
      console.log('Deleted file is not a video, ignoring...')
      return null
    }

    // Assuming the structure of the file path is "recipes/filename.extension"
    const fileName = filePath.split('/').pop().split('.').slice(0, -1).join('.') // Extract the file name without extension

    // Construct the thumbnail file path in the same 'recipes' folder
    const thumbFilePath = `recipes/thumb_${fileName}.png`

    // Delete the thumbnail file from Firebase Storage
    try {
      await storage.bucket(object.bucket).file(thumbFilePath).delete()
    } catch (error: any) {
      console.error('Failed to delete thumbnail:', error.message || error)
    }

    // Delete the Firestore document from the 'thumbnails' collection
    const snapshot = await admins
      .firestore()
      .collection('thumbnails')
      .where('originalVideo', '==', filePath)
      .get()

    snapshot.forEach((doc: any) => {
      doc.ref.delete().catch((error: any) => {
        console.error('Failed to delete Firestore document:', error.message)
      })
    })

    console.log('Cleanup completed for video and thumbnail.')

    return null
  })
