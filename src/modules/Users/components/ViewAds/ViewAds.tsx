import React from 'react'
import { Avatar, Grid } from '@mui/material'
import { ViewAdDetails } from '../components'
import { IMAGES_ARRAY } from '@cookup/constant'

interface TViewAds {
  user?: any
  setUserValues: any
  userLikesCommentsData?: any
  onSelectRecipe?: (recipe: any) => void
}

export const ViewAds = (props: TViewAds) => {
  const { setUserValues, user, onSelectRecipe, userLikesCommentsData } =
    props || {}

  const [recipe, setRecipe] = React.useState(null)
  const [isImageClicked, setIsImageClicked] = React.useState(false)

  return (
    <React.Fragment>
      <Grid container justifyContent="center" mt={4} my={2}>
        {userLikesCommentsData && isImageClicked ? (
          <ViewAdDetails
            recipe={recipe}
            setUserValues={setUserValues}
            userLikesCommentsData={userLikesCommentsData}
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
                  onSelectRecipe && onSelectRecipe(item)
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
