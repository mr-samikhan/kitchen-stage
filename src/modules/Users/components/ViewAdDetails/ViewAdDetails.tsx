import React from 'react'
import { COLORS, USER_ADS_DATA } from '@cookup/constant'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

interface TViewDetails {
  img?: string
  isDashboardAidUI?: boolean
  setUserValues?: any
}

export const ViewAdDetails = (props: TViewDetails) => {
  const { isDashboardAidUI, img, setUserValues } = props || {}

  let isAcive = true

  return (
    <>
      <Grid item xs={12} md={4} px={2}>
        <Avatar
          variant="rounded"
          src={img || '/assets/images/card-img.svg'}
          sx={{
            height: 400,
            width: { xs: 'auto', md: 400 },
          }}
        />
        <Box
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
        </Box>
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
            {index !== 5 && index !== 6 && !isDashboardAidUI && (
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
            {index === 5 && (
              <Box display="flex" alignItems="center" pl={2}>
                <Typography variant="h5" color="secondary">
                  328
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
            {index === 6 && (
              <Box display="flex" alignItems="center" pl={2}>
                <Typography variant="h5" color="secondary">
                  54
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
