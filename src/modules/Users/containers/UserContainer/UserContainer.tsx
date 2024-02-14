import React from 'react'
import { Api } from '@cookup/services'
import { Box, Grid } from '@mui/material'
import { SortModalUI } from '@cookup/modules'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUsers, usePagination } from '@cookup/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { SET_SORT_VALUE, SET_TAB_VALUE } from '@cookup/redux'
import { COLORS, ROUTES, PERSONAL_USERS_HEADER } from '@cookup/constant'
import {
  Layout,
  SubHeader,
  CustomList,
  CustomSortModal,
} from '@cookup/components'

export const UserContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { state } = useLocation()

  const { tabValue, sortBy, filterBy } = useSelector((state: any) => state.user)
  const { experience, ageRange, businessType, sortType, gender } = filterBy

  const { isSearchFocus, isSortModal, isFilterModal, searchValue } =
    useSelector((state: any) => state.header)

  const { users, usersLoading } = useGetUsers({})

  const [filteredData, setFilteredData] = React.useState<any>(null)

  React.useEffect(() => {
    dispatch(SET_TAB_VALUE('personal'))
  }, [])

  //pagination
  const { goToNextPage, currentItems, goToPreviousPage } = usePagination(
    users,
    7
  )

  //filter
  React.useEffect(() => {
    if (searchValue.length) {
      const items = [...currentItems]
      const filteredItems = items.filter(
        (item: any) =>
          item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.status.toLowerCase().includes(searchValue.toLowerCase())
      )

      setFilteredData(filteredItems)
    } else {
      setFilteredData(null)
    }
  }, [searchValue])

  React.useEffect(() => {
    if (sortBy.sortValue !== '') {
      const filter = Api.user.filterUsers(users, sortBy.sortValue)
      setFilteredData(filter)
    } else {
      setFilteredData(null)
    }
  }, [sortBy])

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

  // const sortedByEmailAsc = Api.user.sortUsers(
  //   users,
  //   sortBy.sortValue !== '' ? sortBy.sortValue : '',
  //   sortBy.sortType
  // )

  return (
    <Layout
      isExportCSV
      isSearchInput
      isPaginationIcons
      onNextPage={goToNextPage}
      bgcolor={COLORS.background}
      isFooter={users?.length > 7}
      onPreviousPage={goToPreviousPage}
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
            <SubHeader isSort={false} isFilter />
            {isSearchFocus ? (
              <Box mt={4}>
                <img src="/assets/images/frame.svg" width="100%" alt="" />
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        {!isSearchFocus && tabValue === 'personal' && (
          <CustomList
            isActionButton
            isBgColor="white"
            iconPosition="flex-end"
            isLoading={usersLoading}
            onNavigation={onNavigation}
            headerData={PERSONAL_USERS_HEADER}
            data={filteredData || currentItems}
            showKeys={['name', 'email', 'phone', 'status']}
          />
        )}
        {!isSearchFocus && tabValue === 'business' && (
          <CustomList
            isActionButton
            isBgColor="white"
            iconPosition="flex-end"
            isLoading={usersLoading}
            onNavigation={onNavigation}
            data={filteredData || currentItems}
            headerData={PERSONAL_USERS_HEADER}
            showKeys={['name', 'email', 'phone', 'status']}
          />
        )}
        {isSortModal && (
          <CustomSortModal top={160} padding="12px 0px 12px 0px">
            <SortModalUI isSortUI />
          </CustomSortModal>
        )}
        {isFilterModal && (
          <CustomSortModal
            top={160}
            padding="12px 0px 12px 0px"
            title="Filter"
            onClose={() => {
              dispatch(
                SET_SORT_VALUE({
                  sortValue: '',
                })
              )
            }}
          >
            <SortModalUI
              isNewFilterUI
              // isFilterUI={tabValue === 'business' ? false : true}
              // isBusinessFilter={tabValue === 'business' ? true : false}
            />
          </CustomSortModal>
        )}
      </Box>
    </Layout>
  )
}

export default UserContainer
