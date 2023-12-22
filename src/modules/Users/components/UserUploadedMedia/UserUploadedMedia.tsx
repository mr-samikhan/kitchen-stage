import React from 'react'
import { Avatar, Grid } from '@mui/material'
import { IMAGES_ARRAY } from '@cookup/constant'

export const UserUploadedMedia = () => {
  return (
    <React.Fragment>
      <Grid container justifyContent="center" mt={4} my={2}>
        <Grid
          item
          xs={12}
          md={11}
          gap={3}
          display="flex"
          flexWrap="wrap"
          justifyContent={{
            xs: 'center',
            md: 'flex-start',
          }}
        >
          {IMAGES_ARRAY.map((item, index) => (
            <Avatar
              src={item}
              key={index}
              variant="rounded"
              sx={{
                width: { md: 240, xs: 120 },
                height: { md: 240, xs: 120 },
              }}
            />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default UserUploadedMedia
