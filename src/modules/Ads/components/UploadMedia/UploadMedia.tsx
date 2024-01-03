import { COLORS } from '@cookup/constant'
import { ChevronRight } from '@mui/icons-material'
import React, { useRef, ChangeEvent } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'

interface SelectedFile {
  file: File
  fileName: string
  fileSize: string
  fileType: string
  fileUrl: string
}

interface UploadMediaProps {
  setSelectedFile?: any
  onNavigate?: () => void
  selectedFile: SelectedFile
  isNavigationTitle?: string
  fileType?: 'image' | 'video'
}

const UploadMedia: React.FC<UploadMediaProps> = (props) => {
  const {
    onNavigate,
    selectedFile,
    setSelectedFile,
    isNavigationTitle,
    fileType = 'image',
  } = props || {}

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const isFileTypeAllowed = (file: File): boolean => {
    const allowedTypes = getFileAcceptValue().split(',')
    const fileTypeRegex = new RegExp(allowedTypes.join('|'), 'i')
    return fileTypeRegex.test(file.type)
  }

  const getFileAcceptValue = (): string => {
    switch (fileType) {
      case 'image':
        return 'image/*'
      case 'video':
        return 'video/*'
      default:
        return 'application/pdf'
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files && event.target.files[0]
    if (file && isFileTypeAllowed(file)) {
      const fileUrl = URL.createObjectURL(file)

      setSelectedFile({
        ...selectedFile,
        file,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)}mb`,
        fileType: file.type,
        fileUrl,
      })
    }
  }

  return (
    <React.Fragment>
      {selectedFile.fileUrl && (
        <>
          <Box
            height={400}
            display="flex"
            borderRadius="12px"
            alignItems="center"
            position="relative"
            flexDirection="column"
            width={{ md: 400, xs: '80%' }}
          >
            {isNavigationTitle && fileType == 'image' && (
              <Box
                px={4}
                bottom={0}
                width="100%"
                height={50}
                display="flex"
                position="absolute"
                alignItems="center"
                bgcolor={COLORS.secondary.light}
                borderRadius="0px 0px 12px 12px"
              >
                <Typography
                  variant="h6"
                  fontFamily="Poppins"
                  color={COLORS.input.main}
                >
                  {isNavigationTitle}
                </Typography>
                <IconButton>
                  <ChevronRight
                    sx={{
                      color: COLORS.white,
                    }}
                  />
                </IconButton>
              </Box>
            )}
            {fileType === 'image' ? (
              <img
                width="100%"
                height="100%"
                alt="Uploaded"
                src={selectedFile.fileUrl}
                style={{
                  borderRadius: '12px',
                }}
              />
            ) : (
              fileType === 'video' && (
                <video controls width="100%" height={'100%'}>
                  <source
                    src={selectedFile.fileUrl}
                    type={selectedFile.fileType}
                  />
                  Your browser does not support the video tag.
                </video>
              )
            )}
            <Box
              py={1}
              display="flex"
              justifyContent="center"
              flexDirection="column"
            >
              <Button
                variant="contained"
                sx={{ fontFamily: 'Poppins' }}
                onClick={() => handleFileUpload()}
              >
                Reupload Media
              </Button>
              <Box py={2}>
                <Typography variant="h6" fontFamily="Poppins" color="#808080">
                  . We accept both image / video
                </Typography>
                <Typography variant="h6" fontFamily="Poppins" color="#808080">
                  . Image size: min. 500x500 px
                </Typography>
                <Typography variant="h6" fontFamily="Poppins" color="#808080">
                  . Video length: less than 30 seconds
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
      {!selectedFile.fileUrl && (
        <Box
          height={320}
          display="flex"
          borderRadius="12px"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          width={{ md: 570, xs: '80%' }}
          border={'1px dashed #85848B'}
        >
          <Button
            variant="contained"
            sx={{ fontFamily: 'Poppins' }}
            onClick={() => handleFileUpload()}
          >
            Upload Media
          </Button>
          <Box py={2}>
            <Typography variant="h6" fontFamily="Poppins" color="#808080">
              . We accept both image / video
            </Typography>
            <Typography variant="h6" fontFamily="Poppins" color="#808080">
              . Image size: min. 500x500 px
            </Typography>
            <Typography variant="h6" fontFamily="Poppins" color="#808080">
              . Video length: less than 30 seconds
            </Typography>
          </Box>
        </Box>
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept={getFileAcceptValue()}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </React.Fragment>
  )
}

export default UploadMedia
