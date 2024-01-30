import React, { useEffect } from 'react'
import { useGetAds } from '@cookup/hooks'
import { SET_TAB_VALUE } from '@cookup/redux'
import { useNavigate } from 'react-router-dom'
import { AdsTypes, useAds } from '@cookup/modules'
import { ADS_TABS, ROUTES } from '@cookup/constant'
import { Box, Container, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { CustomLoader, Layout, MuiCustomTab } from '@cookup/components'

export const AdsContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { setSelectedIndex, selectedIndex, onSelectSingleAd, onDeleteAd } =
    useAds()

  const { tabValue } = useSelector((state: any) => state.user)

  useEffect(() => {
    dispatch(SET_TAB_VALUE('current'))
  }, [])

  const { ads, adsLoading, isFetching } = useGetAds({ value: tabValue })

  if (adsLoading || isFetching) return <CustomLoader />

  return (
    <Layout
      isTitle
      showButton1
      button1Text="Create Ad"
      button1Icon="/assets/icons/add_square.svg"
      onButton1Click={() => navigate(ROUTES.CREATE_AD)}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid item md={10} xs={12} display="flex" justifyContent="center">
            <Grid item md={4} xs={12}>
              <MuiCustomTab
                width="180px"
                labels={ADS_TABS}
                className="support-tabs"
              />
            </Grid>
          </Grid>
          <Grid item container display="flex" justifyContent="center" py={4}>
            <Grid
              item
              md={8}
              xs={12}
              gap={5}
              display="flex"
              flexWrap="wrap"
              justifyContent={{ xs: 'center', md: 'start' }}
            >
              <AdsTypes
                data={ads}
                tabValue={tabValue}
                onDeleteAd={onDeleteAd}
                selectedIndex={selectedIndex}
                onSelectSingleAd={onSelectSingleAd}
                setSelectedIndex={setSelectedIndex}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default AdsContainer
