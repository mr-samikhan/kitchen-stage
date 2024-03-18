const os = require('os')
const path = require('path')
const uuid = require('uuid')
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const spawn = require('child-process-promise').spawn
const { Storage } = require('@google-cloud/storage')

export const GetThumbnail = () =>
  functions.storage.object().onFinalize(async (object: any) => {
    const storage = new Storage()
    const firestore = admin.firestore()
    const fileBucket = object.bucket
    const filePath = object.name
    const contentType = object.contentType

    if (!contentType.startsWith('video/')) {
      console.log('This is not a video file.')
      return null
    }

    const fileName = path.basename(filePath, path.extname(filePath))
    const tempFilePath = path.join(
      os.tmpdir(),
      `${fileName}${path.extname(filePath)}`
    )
    const compressedVideoPath = path.join(
      os.tmpdir(),
      `${fileName}_compressed${path.extname(filePath)}`
    )
    const tempThumbPath = path.join(os.tmpdir(), `thumb_${fileName}.png`)

    try {
      await storage
        .bucket(fileBucket)
        .file(filePath)
        .download({ destination: tempFilePath })

      // Compress the video file using FFmpeg.
      await spawn('ffmpeg', [
        '-i',
        tempFilePath,
        '-vcodec',
        'h264',
        '-acodec',
        'aac',
        '-strict',
        '-2',
        compressedVideoPath,
      ])

      // Generate a thumbnail from the compressed video.
      await spawn('ffmpeg', [
        '-i',
        compressedVideoPath,
        '-ss',
        '00:00:01',
        '-frames:v',
        '1',
        tempThumbPath,
      ])
    } catch (error) {
      console.error('Error processing video with FFmpeg:', error)
      return null
    }

    const downloadToken = uuid.v4()
    const thumbFilePath = `recipes/thumb_${fileName}.png`

    try {
      await storage.bucket(fileBucket).upload(tempThumbPath, {
        destination: thumbFilePath,
        metadata: {
          contentType: 'image/png',
          metadata: {
            firebaseStorageDownloadTokens: downloadToken,
          },
        },
      })
    } catch (error) {
      console.error(
        'Failed to upload the thumbnail to Firebase Storage:',
        error
      )
      return null
    }

    const thumbFileUrl = `https://firebasestorage.googleapis.com/v0/b/${fileBucket}/o/${encodeURIComponent(
      thumbFilePath
    )}?alt=media&token=${downloadToken}`

    try {
      await firestore.collection('thumbnails').add({
        originalVideo: filePath,
        thumbnail: thumbFilePath,
        thumbnailUrl: thumbFileUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      console.log(
        'Thumbnail and video file processed and metadata stored successfully.'
      )
    } catch (error) {
      console.error('Failed to create a Firestore document:', error)
    }

    return null
  })
