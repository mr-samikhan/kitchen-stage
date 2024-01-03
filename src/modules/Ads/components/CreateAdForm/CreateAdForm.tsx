import React, { useState } from 'react'
import { UploadMedia } from '../components'
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material'

interface SelectedFile {
  file: File
  fileName: string
  fileSize: string
  fileType: string
  fileUrl: string
}

export const CreateAdForm = () => {
  const [selectedFile, setSelectedFile] = useState<SelectedFile>({
    file: new File([], ''),
    fileName: '',
    fileSize: '',
    fileType: '',
    fileUrl: '',
  })
  return (
    <React.Fragment>
      <Grid item md={5} xs={12} px={7}>
        <Typography variant="h4" fontFamily="Poppins" color="secondary.main">
          Ad Information
        </Typography>
        <Box
          py={2}
          gap={1}
          display="flex"
          flexWrap="wrap"
          width={{ xs: '100%', md: 366 }}
        >
          <TextField
            fullWidth
            sx={inputStyle}
            placeholder="Ad Name (For recognition)"
          />
          <TextField sx={inputStyle} placeholder="Website" fullWidth />
          <TextField
            fullWidth
            sx={inputStyle}
            placeholder="Location"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <img src="/assets/icons/search.svg" alt="" />
                </IconButton>
              ),
            }}
          />
          <TextField
            select
            fullWidth
            label="Select Age Range"
            sx={{
              '& .MuiFormLabel-root': {
                fontFamily: 'Poppins',
                color: '#808080',
              },
            }}
          />
          <TextField
            select
            fullWidth
            label="Select Age Range"
            sx={{
              '& .MuiFormLabel-root': {
                fontFamily: 'Poppins',
              },
            }}
          />
          <TextField
            fullWidth
            sx={inputStyle}
            placeholder="Select Keywords"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <img src="/assets/icons/search.svg" alt="" />
                </IconButton>
              ),
            }}
          />
          <TextField
            fullWidth
            multiline
            rows={6}
            sx={inputStyle}
            placeholder="Type Description"
          />
          <TextField
            fullWidth
            sx={inputStyle}
            placeholder="Start Date"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <img src="/assets/icons/calendar.svg" alt="" />
                </IconButton>
              ),
            }}
          />
          <TextField
            fullWidth
            sx={inputStyle}
            placeholder="End Date"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <img src="/assets/icons/calendar.svg" alt="" />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Grid>
      <Grid item md={6} xs={12} display="flex" justifyContent="center">
        <UploadMedia
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </Grid>
    </React.Fragment>
  )
}

export default CreateAdForm
const inputStyle = {
  '& .MuiInputBase-input': {
    fontFamily: 'Poppins',
  },
}
