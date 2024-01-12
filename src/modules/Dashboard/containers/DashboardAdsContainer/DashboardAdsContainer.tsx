import React from 'react'
import { useSelector } from 'react-redux'
import { ADS_ARRAY } from '@cookup/constant'
import { SortModalUI } from '@cookup/modules'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Container, Grid } from '@mui/material'
import { CustomSortModal, Layout } from '@cookup/components'

type TAdCard = {
  user: string
  img: string
}

export const DashboardAdsContainer = () => {
  const navigate = useNavigate()

  const { isSortModal, isFilterModal } = useSelector(
    (state: any) => state.header
  )

  return (
    <Layout
      isSort
      isFilter
      isNavigation
      navigationTitle="Ads"
      onGoBack={() => navigate(-1)}
    >
      <Container maxWidth="xl">
        <Grid container pl={5}>
          <Grid
            item
            md={11}
            gap={4}
            display="flex"
            flexWrap="wrap"
            position="relative"
            justifyContent={{ xs: 'center', md: 'start' }}
          >
            {ADS_ARRAY.map((item: TAdCard, index) => (
              <Box
                mt={1}
                key={index}
                position={'relative'}
                width={{ xs: '150px', md: '230px' }}
                height={{ xs: '150px', md: '230px' }}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Box
                  top={-5}
                  width="40px"
                  height="40px"
                  bgcolor="white"
                  position="absolute"
                  borderRadius="100%"
                >
                  <Avatar
                    src={item.user}
                    sx={{
                      border: '4px solid white',
                    }}
                  />
                </Box>
                <img alt="" width="100%" height="100%" src={item.img} />
              </Box>
            ))}
          </Grid>
        </Grid>
        {isSortModal && (
          <CustomSortModal top={160} padding="12px 0px 12px 0px">
            <SortModalUI isSortUI />
          </CustomSortModal>
        )}
        {isFilterModal && (
          <CustomSortModal top={160} padding="12px 0px 12px 0px" title="Filter">
            <SortModalUI isBusinessFilter />
          </CustomSortModal>
        )}
      </Container>
    </Layout>
  )
}

export default DashboardAdsContainer
