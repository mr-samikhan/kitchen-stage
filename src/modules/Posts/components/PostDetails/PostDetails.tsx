import React from 'react'
import { ViewAdDetails } from '@cookup/modules'
import { Avatar, Box, Grid } from '@mui/material'

interface PostDetailsProps {
  singleItem: {} | null
  userLikesCommentsData: {}
  setUserValues: React.Dispatch<React.SetStateAction<null>>
}

export const PostDetails = (props: PostDetailsProps) => {
  const { setUserValues, userLikesCommentsData, singleItem } = props || {}

  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={12} pl={8} container>
          <Grid item md={12} px={2}>
            <Box width="100%" mt={5}>
              <Box width={50} height={50}>
                <Avatar src="/assets/icons/user1.svg" />
              </Box>
            </Box>
          </Grid>
          <ViewAdDetails
            recipe={singleItem}
            setUserValues={setUserValues}
            userLikesCommentsData={userLikesCommentsData}
            onVideoClick={() => alert('you clicked on video icon')}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default PostDetails
