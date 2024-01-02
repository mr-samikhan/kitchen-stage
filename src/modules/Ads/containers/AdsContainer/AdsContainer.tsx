import React, { useEffect } from 'react'
import { ADS_TABS } from '@cookup/constant'
import { SET_TAB_VALUE } from '@cookup/redux'
import { AdsTypes, useAds } from '@cookup/modules'
import { Box, Container, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, MuiCustomTab } from '@cookup/components'

export const AdsContainer = () => {
  const dispatch = useDispatch()

  const { setSelectedIndex, selectedIndex } = useAds()

  const { tabValue } = useSelector((state: any) => state.user)

  useEffect(() => {
    dispatch(SET_TAB_VALUE('current'))
  }, [])

  return (
    <Layout isTitle isSuspendBtn="Create Ad">
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
                tabValue={tabValue}
                selectedIndex={selectedIndex}
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
