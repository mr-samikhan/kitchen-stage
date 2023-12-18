import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid } from '@mui/material'
import { CustomList, Layout, SubHeader } from '@cookup/components'

export const UserContainer = () => {
  const { tabValue } = useSelector((state: any) => state.user)
  const { isSearchFocus } = useSelector((state: any) => state.header)
  return (
    <Layout
      isTitle
      isTabs
      isSearchInput
      // isDeleteBtn
      // isNavigation
      // isSuspendBtn="Suspend"
      // navigationTitle="Emma Gosling"
    >
      <Box my={3} mt={2}>
        <Grid container>
          <Grid item md={11} xs={12} textAlign="right">
            <SubHeader />
            {isSearchFocus && (
              <Box mt={4}>
                <img src="assets/images/frame.svg" width="100%" alt="" />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        {!isSearchFocus && tabValue === 'personal' && (
          <CustomList
            isPagination
            isActionButton
            isBgColor="white"
            headerData={['NAME', 'EMAIL', 'CITY', 'STATE, ZIP CODE']}
            data={[
              {
                name: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
              },
              {
                name: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
              },
              {
                name: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
              },
              {
                name: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
              },

              {
                name: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
              },
              {
                name: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
              },
              {
                name: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
              },
              {
                name: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
              },
            ]}
          />
        )}
        {!isSearchFocus && tabValue === 'business' && (
          <CustomList
            isPagination
            isActionButton
            iconPosition="flex-end"
            headerData={[
              'BUSNIESS NAME',
              'EMAIL',
              'TYPE',
              'CITY',
              'STATE, ZIP CODE',
            ]}
            data={[
              {
                businessName: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
                type: 'admin',
              },
              {
                businessName: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
                type: 'admin',
              },
              {
                businessName: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
                type: 'admin',
              },
              {
                businessName: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
                type: 'admin',
              },
              {
                businessName: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
                type: 'admin',
              },
              {
                businessName: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
                type: 'admin',
              },
              {
                businessName: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
                type: 'admin',
              },
              {
                businessName: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
                type: 'admin',
              },
              {
                businessName: 'Emma Gosling',
                email: 'sam@sam.com',
                city: 'New York',
                state: 'NY, 123456',
                type: 'admin',
              },
            ]}
          />
        )}
      </Box>
    </Layout>
  )
}

export default UserContainer
