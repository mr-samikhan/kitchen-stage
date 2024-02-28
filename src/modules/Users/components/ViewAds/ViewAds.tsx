import React from 'react'
import { Avatar, Grid } from '@mui/material'
import { ViewAdDetails } from '../components'
import { IMAGES_ARRAY } from '@cookup/constant'

interface TViewAds {
  user?: any
  setUserValues: any
}

export const ViewAds = (props: TViewAds) => {
  const { setUserValues, user } = props || {}

  const [recipe, setRecipe] = React.useState(null)
  const [isImageClicked, setIsImageClicked] = React.useState(false)

  return (
    <React.Fragment>
      <Grid container justifyContent="center" mt={4} my={2}>
        {isImageClicked ? (
          <ViewAdDetails
            recipe={recipe}
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
            {user?.userUploadedRecipes?.map((item: any, index: number) => (
              <Avatar
                src={item}
                key={index}
                variant="rounded"
                onClick={() => {
                  setRecipe(item)
                  setIsImageClicked(true)
                }}
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
