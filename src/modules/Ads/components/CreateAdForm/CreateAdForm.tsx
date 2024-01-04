import React, { useState } from 'react'
import { CustomTextField } from '@cookup/components'
import { Box, Chip, Grid, Typography } from '@mui/material'
import { CustomSelect, UploadMedia } from '../components'
import { AGE_RANGE_ARRAY, GENDER_ARRAY } from '@cookup/constant'

interface SelectedFile {
  file: File
  fileName: string
  fileSize: string
  fileType: string
  fileUrl: string
}

interface ICreateForm {
  methods?: any
  adValues: {
    ageRange: any[]
    gender: any[]
  }

  onMultiSelect?: (item: any, key: any) => void
}

export const CreateAdForm = (props: ICreateForm) => {
  const { methods, onMultiSelect, adValues } = props || {}

  const [selectedFile, setSelectedFile] = useState<SelectedFile>({
    file: new File([], ''),
    fileName: '',
    fileSize: '',
    fileType: '',
    fileUrl: '',
  })

  return (
    <React.Fragment>
      <Grid item md={5} xs={12} pl={{ xs: 0, md: 7 }}>
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
          <CustomTextField
            fullWidth
            name="adName"
            sx={inputStyle}
            placeholder="Ad Name (For recognition)"
          />
          <CustomTextField
            fullWidth
            name="website"
            sx={inputStyle}
            placeholder="Website"
          />
          <CustomTextField
            fullWidth
            name="location"
            sx={inputStyle}
            placeholder="Location"
            icon="/assets/icons/search.svg"
          />
          <CustomSelect
            isMultiSelect
            name="ageRange"
            label="Age Range"
            methods={methods}
            adValues={adValues}
            options={AGE_RANGE_ARRAY}
            placeholder="Select Age Range"
            onMultiSelect={onMultiSelect}
          />
          <CustomSelect
            isMultiSelect
            name="gender"
            label="Gender"
            methods={methods}
            adValues={adValues}
            options={GENDER_ARRAY}
            placeholder="Select Gender"
            onMultiSelect={onMultiSelect}
          />
          <CustomTextField
            fullWidth
            multiline
            rows={6}
            sx={inputStyle}
            name="description"
            placeholder="Type Description"
          />
          <CustomTextField
            fullWidth
            name="startDate"
            sx={inputStyle}
            placeholder="Start Date"
            icon="/assets/icons/calendar.svg"
          />
          <CustomTextField
            fullWidth
            name="endDate"
            sx={inputStyle}
            placeholder="End Date"
            icon="/assets/icons/calendar.svg"
          />
        </Box>
      </Grid>
      <Grid item md={6} xs={12} display="flex" justifyContent="center">
        <UploadMedia
          name="image"
          methods={methods}
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
