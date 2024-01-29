import React from 'react'
import { COLORS } from '@cookup/constant'
import { ChevronRight } from '@mui/icons-material'
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material'

interface IReviewAd {
  data?: any
}

export const ReviewAd = (props: IReviewAd) => {
  const { data } = props || {}

  return (
    <React.Fragment>
      <Grid item container>
        <Grid item md={5} xs={12} pl={{ xs: 0, md: 7 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            {[
              { label: 'Name', placeholder: data.adName },
              { label: 'Website', placeholder: data.website },
              { label: 'Location', placeholder: data.location },
              { label: 'Age Range', placeholder: data.ageRange },
              { label: 'Gender', placeholder: data.gender },
              { label: 'Interests', placeholder: data?.interests || '' },
              {
                label: 'Start Date',
                placeholder: new Date(data.startDate).toDateString(),
              },
              {
                label: 'End Date',
                placeholder: new Date(data.endDate).toDateString(),
              },
            ].map(({ label, placeholder }) => (
              <Box key={label} display="flex" gap={2} alignItems="center">
                <Typography variant="h6" width={95} fontFamily="Poppins">
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  placeholder={
                    typeof placeholder === 'string'
                      ? placeholder
                      : placeholder?.map((item: any) => item + '')
                  }
                  className="grey-background"
                />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
          pl={{ xs: 0, md: 7 }}
          mt={{ xs: 2, md: 0 }}
          maxHeight={{ md: 500, xs: 'auto' }}
          maxWidth={{ md: 500, xs: '100%' }}
        >
          <Box position="relative">
            <Box
              px={2}
              bottom={0}
              width="100%"
              height={40}
              display="flex"
              alignItems="center"
              position="absolute"
              bgcolor={COLORS.secondary.light}
              borderRadius="0px 0px 12px 12px"
            >
              <Typography
                variant="h6"
                fontFamily="Poppins"
                color={COLORS.input.main}
              >
                aesop.com
              </Typography>
              <IconButton>
                <ChevronRight
                  sx={{
                    color: COLORS.white,
                  }}
                />
              </IconButton>
            </Box>
            <img
              alt=""
              width="100%"
              height="auto"
              src={URL.createObjectURL(data?.image?.file)}
            />
          </Box>
          <Typography variant="h6" fontFamily="Poppins" color="primary" mt={2}>
            {data?.description}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ReviewAd
