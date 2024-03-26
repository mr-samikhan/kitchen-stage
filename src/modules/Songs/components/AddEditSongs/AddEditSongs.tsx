import React from 'react'
import { UploadAudio } from '@cookup/modules'
import { FormProvider } from 'react-hook-form'
import { CustomTextField, Form } from '@cookup/components'
import { Box, Button, Modal, Paper, Typography } from '@mui/material'

interface AddEditSongsProps {
  methods: any
  open: boolean
  onSubmit: any
  isEdit?: boolean
  singleItem?: any
  onClose: () => void
  isLoading?: boolean
}

const AddEditSongs = (props: AddEditSongsProps) => {
  const { open, onClose, onSubmit, methods, isLoading, singleItem } =
    props || {}
  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose}>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Paper className="songs-modal">
              <Box textAlign="center">
                <img
                  height={46}
                  width={46}
                  alt="music"
                  src="/assets/icons/selected-music.svg"
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  fontSize={20}
                  color="primary"
                  fontWeight={600}
                  fontFamily="Poppins"
                >
                  Add Music
                </Typography>
              </Box>
              <Box width="100%" my={2}>
                <Typography variant="h5">Title</Typography>
                <CustomTextField
                  fullWidth
                  name="title"
                  className="music-input"
                />
              </Box>
              <Box width="100%" my={2}>
                <Typography variant="h5">Artist</Typography>
                <CustomTextField
                  fullWidth
                  name="artist"
                  className="music-input"
                />
              </Box>
              <Box width="100%" my={2}>
                <Typography variant="h5">Upload</Typography>
                <UploadAudio methods={methods} file={singleItem?.file} />
              </Box>
              <Box display="flex" gap={2} width="100%">
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={onClose}
                  sx={buttonStyle}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  type="submit"
                  sx={buttonStyle}
                  variant="contained"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Done'}
                </Button>
              </Box>
            </Paper>
          </Form>
        </FormProvider>
      </Modal>
    </React.Fragment>
  )
}

export default AddEditSongs

const buttonStyle = {
  fontFamily: 'Poppins',
}
