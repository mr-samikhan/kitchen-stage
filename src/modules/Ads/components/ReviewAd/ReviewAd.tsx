import React from 'react'
import { COLORS } from '@cookup/constant'
import { ChevronRight } from '@mui/icons-material'
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material'

export const ReviewAd = () => {
  return (
    <React.Fragment>
      <Grid item container>
        <Grid item md={5} xs={12} pl={{ xs: 0, md: 7 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            {[
              { label: 'Name', placeholder: 'AESOP' },
              { label: 'Website', placeholder: 'AESOP.com' },
              { label: 'Location', placeholder: 'New Port,CA' },
              { label: 'Age Range', placeholder: '21-27, 28-35' },
              { label: 'Gender', placeholder: 'Male, Non Binary' },
              { label: 'Interests', placeholder: 'Pasta' },
              { label: 'Start Date', placeholder: 'July 15,2021' },
              { label: 'End Date', placeholder: 'July 30,2021' },
            ].map(({ label, placeholder }) => (
              <Box key={label} display="flex" gap={2} alignItems="center">
                <Typography variant="h6" width={95} fontFamily="Poppins">
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  placeholder={placeholder}
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
              src="/assets/images/ad_card1.svg"
            />
          </Box>
          <Typography variant="h6" fontFamily="Poppins" color="primary" mt={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ReviewAd
