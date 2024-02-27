import React from 'react'
import {
  DASHBOARD_USERS,
  DASHBOARD_ACTIVITES,
  DASHBOARD_POPULAR_RECIPE,
  DASHBOARD_POPULAR_RESTAURANTS,
  COLORS,
  DASHBOARD_BUSINESS_ACTIVITES,
} from '@cookup/constant'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDashboard } from '@cookup/modules'
import { CustomLoader, CustomSortModal, Layout } from '@cookup/components'
import { CardContainers } from '../../components/components'

export const DashboardContainer = () => {
  const { isSortModal } = useSelector((state: any) => state.header)

  const {
    registeredUsers,
    unregisteredUsers,
    isLoading,
    users,
    registeredPercentageIncrease,
    deactivatedPercentageIncrease,
  } = useDashboard()

  if (isLoading) {
    return <CustomLoader />
  }
  return (
    <React.Fragment>
      <Layout isTitle isSort mainHeight="auto" bgcolor={COLORS.background}>
        <CardContainers
          title="Users"
          data={DASHBOARD_USERS.map((item) => {
            if (item.title === 'Registered Users') {
              return {
                ...item,
                counter: registeredUsers?.length,
                percentage: registeredPercentageIncrease,
              }
            }
            if (item.title === 'Deactivated Users') {
              return {
                ...item,
                counter: unregisteredUsers?.length,
                percentage: deactivatedPercentageIncrease,
              }
            }
          })}
        />
        <Box mt={4}>
          <CardContainers title="Activity" data={DASHBOARD_ACTIVITES} />
        </Box>
        <Box mt={4}>
          <CardContainers
            title="Business Account Activity"
            data={DASHBOARD_BUSINESS_ACTIVITES}
          />
        </Box>
        {/* <Box mt={4}>
          <CardContainers
            titleColor="secondary.light"
            data={DASHBOARD_POPULAR_RECIPE}
            title="Most Popular Receipe (added to cellar)"
          />
        </Box>
        <Box mt={4} mb={4}>
          <CardContainers
            titleColor="secondary.light"
            data={DASHBOARD_POPULAR_RESTAURANTS}
            title="Most Popular Restaurants (added to cellar)"
          />
        </Box> */}
        {isSortModal && <CustomSortModal />}
      </Layout>
    </React.Fragment>
  )
}

export default DashboardContainer
