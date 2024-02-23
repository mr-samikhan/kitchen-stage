import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ADS_ARRAY, COLORS } from '@cookup/constant'
import { SortModalUI, ViewAdDetails } from '@cookup/modules'
import { Avatar, Box, Container, Grid, IconButton } from '@mui/material'
import { CustomSortModal, Layout, TableFooter } from '@cookup/components'

type TAdCard = {
  user: string
  img: string
}

export const PostsContainer = () => {
  const navigate = useNavigate()

  const { isSortModal, isFilterModal } = useSelector(
    (state: any) => state.header
  )

  const [adsSteps, setAdsSteps] = React.useState(0)
  const [singleItem, setSingleItem] = React.useState<TAdCard | null>(null)

  const { searchValue } = useSelector((state: any) => state.header)
  // console.log(searchValue, '>>>>searchValue')

  const renderSteps = () => {
    switch (adsSteps) {
      case 0:
        return (
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
                  width={{ xs: '150px', md: '200px' }}
                  height={{ xs: '150px', md: '200px' }}
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setAdsSteps(1)
                    setSingleItem(item)
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
              <Grid item md={11} display="flex" justifyContent="center" my={2}>
                <TableFooter
                  isPaginationIcons
                  onNextPage={() => console.log('nextPage')}
                  onPreviousPage={() => console.log('prePage')}
                />
              </Grid>
            </Grid>
          </Grid>
        )

      case 1:
        return (
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
                onVideoClick={() => alert('you clicked on video icon')}
              />
            </Grid>
          </Grid>
        )

      default:
        throw new Error('Unknown step')
    }
  }

  return (
    <Layout
      isNavigation
      bgcolor={COLORS.background}
      isSearchInput={adsSteps === 0}
      isSort={adsSteps === 0}
      navigationTitle={
        singleItem === null ? 'Manage Posts' : 'The Appetizers Bar'
      }
      navTitleColor={singleItem === null ? 'secondary.light' : 'primary.main'}
      onGoBack={() => {
        singleItem === null ? navigate(-1) : setAdsSteps(0)
        setSingleItem(null)
      }}
    >
      <Container maxWidth="xl">
        {renderSteps()}

        {isSortModal && <CustomSortModal />}
      </Container>
    </Layout>
  )
}

export default PostsContainer
