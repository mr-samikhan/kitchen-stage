import React, { useRef } from 'react'
import { Box, IconButton, Typography } from '@mui/material'

interface UploadAudioProps {
  methods?: any
  file?: {
    url: string
    name: string
  }
}

const UploadAudio = (props: UploadAudioProps) => {
  const { methods, file } = props || {}

  const fileInputRef = useRef<HTMLInputElement>(null)

  const isError = methods?.formState?.errors?.file
  console.log(isError)

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files && event.target.files[0]
    methods.setValue('file', file)
  }

  return (
    <React.Fragment>
      <Box
        height={64}
        display="flex"
        borderRadius="8px"
        bgcolor="#EBEBEB"
        alignItems="center"
        justifyContent="center"
        onClick={handleFileUpload}
        border="1px solid #C5C5C5"
      >
        {methods?.watch('file') || file?.url ? (
          <Typography ml={2}>
            {methods?.watch('file')?.name || file?.name}
          </Typography>
        ) : (
          <IconButton>
            <img src="assets/icons/upload-media.svg" alt="upload-media" />
          </IconButton>
        )}
      </Box>
      {isError && (
        <Typography ml={2} color="error">
          {isError.message}
        </Typography>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="audio/mpeg, audio/wav"
      />
    </React.Fragment>
  )
}

export default UploadAudio
