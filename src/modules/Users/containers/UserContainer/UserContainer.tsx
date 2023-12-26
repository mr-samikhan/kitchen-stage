import React from 'react'
import { Box, Grid } from '@mui/material'
import { SET_TAB_VALUE } from '@cookup/redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CustomList, Layout, SubHeader } from '@cookup/components'
import {
  ROUTES,
  BUSINESS_USERS_DATA,
  PERSONAL_USERS_DATA,
  BUSINESS_USERS_HEADER,
  PERSONAL_USERS_HEADER,
} from '@cookup/constant'

export const UserContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { tabValue } = useSelector((state: any) => state.user)
  const { isSearchFocus } = useSelector((state: any) => state.header)

  React.useEffect(() => {
    dispatch(SET_TAB_VALUE('personal'))
  }, [])

  const onNavigation = (item: any) => {
    navigate(`${ROUTES.USERS}/1`, {
      state: { ...item },
    })
  }

  return (
    <Layout isTitle isTabs isSearchInput isExportCSV isPaginationIcons isFooter>
      <Box my={3} mt={2}>
        <Grid container>
          <Grid item md={11} xs={12} textAlign="right">
            <SubHeader />
            {isSearchFocus && (
              <Box mt={4}>
                <img src="/assets/images/frame.svg" width="100%" alt="" />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        {!isSearchFocus && tabValue === 'personal' && (
          <CustomList
            isActionButton
            isBgColor="white"
            data={PERSONAL_USERS_DATA}
            headerData={PERSONAL_USERS_HEADER}
            onNavigation={onNavigation}
          />
        )}
        {!isSearchFocus && tabValue === 'business' && (
          <CustomList
            isActionButton
            iconPosition="flex-end"
            data={BUSINESS_USERS_DATA}
            onNavigation={onNavigation}
            headerData={BUSINESS_USERS_HEADER}
          />
        )}
      </Box>
    </Layout>
  )
}

export default UserContainer
