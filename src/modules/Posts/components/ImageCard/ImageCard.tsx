import React from 'react'
import { COLORS } from '@cookup/constant'
import { TableFooter } from '@cookup/components'
import { Avatar, Box, Grid, Typography } from '@mui/material'

interface ImageCardProps {
  postsCheck: any[]
  postsLoading: boolean
  goToNextPage: () => void
  goToPreviousPage: () => void
  setAdsSteps: React.Dispatch<React.SetStateAction<number>>
  setSingleItem: React.Dispatch<React.SetStateAction<null>>
  setFilterPosts: React.Dispatch<React.SetStateAction<null>>
}

export const ImageCard = (props: ImageCardProps) => {
  const {
    postsLoading,
    postsCheck,
    setAdsSteps,
    setSingleItem,
    setFilterPosts,
    goToNextPage,
    goToPreviousPage,
  } = props || {}

  return (
    <React.Fragment>
      <Grid container pl={5}>
        <Grid
          item
          md={11}
          rowGap={2}
          columnGap={8}
          display="flex"
          flexWrap="wrap"
          position="relative"
          justifyContent={{ xs: 'center', md: 'start' }}
        >
          {!postsLoading && postsCheck?.length === 0 && (
            <Grid container md={11} justifyContent="center" mt={2}>
              <Typography variant="h5" color={COLORS.grey.main}>
                No Data Found
              </Typography>
            </Grid>
          )}
          {postsCheck?.map((item: any, index: number) => (
            <Box
              mt={1}
              key={index}
              position={'relative'}
              width={{ xs: '150px', md: '200px' }}
              height={{ xs: '150px', md: '200px' }}
              sx={{
                cursor: 'pointer',
              }}
              onClick={() => {
                setAdsSteps(1)
                setSingleItem(item)
                setFilterPosts(null)
              }}
            >
              <Box
                top={-8}
                left={-5}
                width="40px"
                height="40px"
                bgcolor="white"
                position="absolute"
                borderRadius="100%"
              >
                <Avatar
                  src={item?.user?.userImage}
                  sx={{
                    border: '4px solid white',
                  }}
                />
              </Box>
              <img
                alt=""
                width="100%"
                height="100%"
                src={item?.thumbnail?.thumbnailUrl}
                style={{ borderRadius: '8px' }}
              />
            </Box>
          ))}
          <Grid item md={12} display="flex" justifyContent="center" my={2}>
            <TableFooter
              isPaginationIcons
              onNextPage={goToNextPage}
              onPreviousPage={goToPreviousPage}
              isNextDisabled={postsCheck?.length < 15}
              isPreviousDisabled={postsCheck?.length < 15}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ImageCard
