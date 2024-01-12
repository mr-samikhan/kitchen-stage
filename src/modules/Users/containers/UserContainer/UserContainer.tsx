import React from 'react'
import { Box, Grid } from '@mui/material'
import { SET_TAB_VALUE } from '@cookup/redux'
import { SortModalUI } from '@cookup/modules'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Layout,
  SubHeader,
  CustomList,
  CustomSortModal,
} from '@cookup/components'
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

  const { state } = useLocation()

  const { tabValue } = useSelector((state: any) => state.user)

  const { isSearchFocus, isSortModal, isFilterModal } = useSelector(
    (state: any) => state.header
  )

  React.useEffect(() => {
    dispatch(SET_TAB_VALUE('personal'))
  }, [])

  const onNavigation = (item: any) => {
    navigate(`${ROUTES.USERS}/1`, {
      state: { ...item },
    })
  }

  let USER_TYPES: any = {
    personal: 'personal',
    business: 'business',
    registered: 'registered',
    deactivated: 'deactivated',
  }

  return (
    <Layout
      isFooter
      isExportCSV
      isSearchInput
      isPaginationIcons
      isTitle={state?.type !== undefined ? false : true}
      isTabs={state?.type !== undefined ? false : true}
      isNavigation={
        state?.type !== undefined && state?.type === USER_TYPES[state?.type]
          ? true
          : false
      }
      navigationTitle={
        state?.type === USER_TYPES[state?.type] ? state?.title : undefined
      }
    >
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
        {isSortModal && (
          <CustomSortModal top={160} padding="12px 0px 12px 0px">
            <SortModalUI isSortUI />
          </CustomSortModal>
        )}
        {isFilterModal && (
          <CustomSortModal top={160} padding="12px 0px 12px 0px" title="Filter">
            <SortModalUI
              isFilterUI={tabValue === 'business' ? false : true}
              isBusinessFilter={tabValue === 'business' ? true : false}
            />
          </CustomSortModal>
        )}
      </Box>
    </Layout>
  )
}

export default UserContainer
