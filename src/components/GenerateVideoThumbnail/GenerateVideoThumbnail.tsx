import React, { useEffect, useState } from 'react'

const GenerateVideoThumbnail = ({ videoUrl }: any) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('')

  useEffect(() => {
    if (videoUrl) {
      const videoElement = document.createElement('video')
      videoElement.src = videoUrl
      videoElement.crossOrigin = 'anonymous'
      videoElement.addEventListener('loadeddata', () => {
        try {
          const scale = 0.25
          const canvas = document.createElement('canvas')
          canvas.width = videoElement.videoWidth * scale
          canvas.height = videoElement.videoHeight * scale
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
          const dataURL = canvas.toDataURL('image/jpeg', 0.85)
          setThumbnailUrl(dataURL)
        } catch (error) {
          console.error('Error generating thumbnail:', error)
        }
      })
      videoElement.load()
    }
  }, [videoUrl])

  if (!thumbnailUrl) return <div>Loading thumbnail...</div>

  return <img src={thumbnailUrl} alt="Video Thumbnail" />
}
export default GenerateVideoThumbnail
