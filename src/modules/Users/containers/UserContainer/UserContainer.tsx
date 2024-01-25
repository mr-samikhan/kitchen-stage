import React from 'react'
import { Box, Grid } from '@mui/material'
import { SET_TAB_VALUE } from '@cookup/redux'
import { useGetUsers } from '@cookup/hooks'
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
  BUSINESS_USERS_HEADER,
  PERSONAL_USERS_HEADER,
} from '@cookup/constant'

export const UserContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { state } = useLocation()

  const { tabValue } = useSelector((state: any) => state.user)

  const { isSearchFocus, isSortModal, isFilterModal, searchValue } =
    useSelector((state: any) => state.header)

  const { users, usersLoading } = useGetUsers({})

  const [filteredData, setFilteredData] = React.useState<any>(null)

  React.useEffect(() => {
    dispatch(SET_TAB_VALUE('personal'))
  }, [])

  //filter
  React.useEffect(() => {
    if (searchValue.length) {
      const items = [...users]
      const filteredItems = items.filter(
        (item) =>
          (item.email &&
            item.email.toLowerCase().includes(searchValue.toLowerCase())) ||
          (item.city &&
            item.city.toLowerCase().includes(searchValue.toLowerCase()))
      )

      setFilteredData(filteredItems)
    } else {
      setFilteredData(null)
    }
  }, [searchValue])

  const onNavigation = (item: any) => {
    navigate(`${ROUTES.USERS}/${item.id}`, {
      state: { ...item, type: tabValue === 'business' },
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
      isExportCSV
      isSearchInput
      isPaginationIcons
      isFooter={users?.length > 7}
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
            data={filteredData || users}
            isActionButton
            isBgColor="white"
            isLoading={usersLoading}
            onNavigation={onNavigation}
            headerData={PERSONAL_USERS_HEADER}
          />
        )}
        {!isSearchFocus && tabValue === 'business' && (
          <CustomList
            data={filteredData || users}
            isActionButton
            iconPosition="flex-end"
            isLoading={usersLoading}
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
