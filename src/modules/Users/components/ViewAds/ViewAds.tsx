import React from 'react'
import { Avatar, Grid } from '@mui/material'
import { ViewAdDetails } from '../components'
import { IMAGES_ARRAY } from '@cookup/constant'

interface TViewAds {
  setUserValues: any
}

export const ViewAds = (props: TViewAds) => {
  const { setUserValues } = props || {}

  const [isImageClicked, setIsImageClicked] = React.useState(false)

  return (
    <React.Fragment>
      <Grid container justifyContent="center" mt={4} my={2}>
        {isImageClicked ? (
          <ViewAdDetails
            setUserValues={setUserValues}
            onVideoClick={() => alert('you clicked on video icon')}
          />
        ) : (
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
                onClick={() => setIsImageClicked(true)}
                sx={{
                  cursor: 'pointer',
                  width: { md: 180, xs: 120 },
                  height: { md: 180, xs: 120 },
                }}
              />
            ))}
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  )
}

export default ViewAds
