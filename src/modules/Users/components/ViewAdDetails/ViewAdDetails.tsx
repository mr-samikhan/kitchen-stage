import React from 'react'
import { COLORS } from '@cookup/constant'
import { ChevronRight } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'

interface TViewDetails {
  recipe?: any
  img?: string
  setUserValues?: any
  isDashboardAidUI?: boolean
  onVideoClick: () => void
}

export const ViewAdDetails = (props: TViewDetails) => {
  const { isDashboardAidUI, img, setUserValues, onVideoClick, recipe } =
    props || {}

  let isAcive = true

  const date = new Date(recipe.createdAt.seconds * 1000)

  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  const USER_ADS_DATA = [
    {
      key: 'Post Date',
      value: formattedDate,
    },
    {
      key: 'Description',
      value: recipe.description,
    },

    {
      key: 'Likes',
      value: recipe.likedBy.length || 0,
    },
    {
      key: 'Comments',
      value: recipe.comments.length || 0,
    },
  ]

  return (
    <>
      <Grid
        item
        xs={12}
        md={4}
        px={2}
        width={400}
        height={400}
        position="relative"
      >
        <Avatar
          variant="rounded"
          src={img || '/assets/images/card-img.svg'}
          sx={{
            height: '100%',
            width: { xs: 'auto', md: '100%' },
          }}
        />
        <Box
          position="absolute"
          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <IconButton onClick={onVideoClick}>
            <img src="/assets/icons/video-icon.svg" alt="video-icon" />
          </IconButton>
        </Box>
        {/* <Box
          mt={2}
          width={260}
          height={50}
          borderRadius="7px"
          bgcolor={isAcive ? COLORS.active : COLORS.transparentOrange}
        >
          <Typography
            variant="h5"
            lineHeight="50px"
            textAlign="center"
            fontFamily={isAcive ? '' : 'Poppins'}
            color={isAcive ? COLORS.success : COLORS.secondary.main}
          >
            {isAcive ? ' Active: Day 3 of 4' : 'Expired'}
          </Typography>
        </Box> */}
      </Grid>
      <Grid item xs={12} md={6} px={2}>
        {USER_ADS_DATA.map((item, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            mt={isDashboardAidUI ? 2 : 1}
          >
            <Typography variant="h5" width={{ md: 150, xs: 100 }}>
              {item.key}
            </Typography>
            {index !== 2 && index !== 3 && !isDashboardAidUI && (
              <Typography
                p={2}
                width={300}
                variant="h5"
                bgcolor="white"
                borderRadius="8px"
                color={COLORS.grey.main}
                height={index === 3 ? 156 : 'auto'}
              >
                {item.value}
              </Typography>
            )}
            {index === 2 && (
              <Box display="flex" alignItems="center" pl={2}>
                <Typography variant="h5" color="secondary">
                  {item.value}
                </Typography>
                <IconButton
                  onClick={() =>
                    setUserValues((prev: any) => ({
                      ...prev,
                      isLikesModal: true,
                    }))
                  }
                >
                  <ChevronRight color="secondary" />
                </IconButton>
              </Box>
            )}
            {index === 3 && (
              <Box display="flex" alignItems="center" pl={2}>
                <Typography variant="h5" color="secondary">
                  {item.value}
                </Typography>
                <IconButton
                  onClick={() =>
                    setUserValues((prev: any) => ({
                      ...prev,
                      isCommentsModal: true,
                    }))
                  }
                >
                  <ChevronRight color="secondary" />
                </IconButton>
              </Box>
            )}
            {isDashboardAidUI && (
              <Typography
                p={2}
                width={300}
                variant="h5"
                display="flex"
                borderRadius="8px"
                alignItems="center"
                color={COLORS.grey.main}
                bgcolor={COLORS.grey.dark}
                height={index === 3 ? 156 : 50}
              >
                {item.value}
              </Typography>
            )}
          </Box>
        ))}
      </Grid>
    </>
  )
}

export default ViewAdDetails
