import React from 'react'
import { ViewAdDetails } from '../components'
import { ArrowBack } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'

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

  const onGoBack = () => {
    setIsImageClicked(false)
  }

  return (
    <React.Fragment>
      {isImageClicked && (
        <Grid item px={4} md={12} width="100%" textAlign="start">
          <Box my={2} display="flex" gap={2} alignItems="center">
            <IconButton onClick={onGoBack}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h3">Go Back</Typography>
          </Box>
        </Grid>
      )}
      <Grid container justifyContent="center" mt={4} my={2}>
        {userLikesCommentsData && isImageClicked ? (
          <ViewAdDetails
            recipe={recipe}
            setUserValues={setUserValues}
            userLikesCommentsData={userLikesCommentsData}
            onVideoClick={() => alert('you clicked on video icon')}
          />
        ) : (
          <>
            {user?.userUploadedRecipes?.length === 0 && (
              <Grid item md={10.5} textAlign="center" pr={10}>
                <Typography variant="h6">No recipes uploaded yet</Typography>
              </Grid>
            )}
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
                  src={item.thumbnail.thumbnailUrl || ''}
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
          </>
        )}
      </Grid>
    </React.Fragment>
  )
}

export default ViewAds
