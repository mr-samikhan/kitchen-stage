import React from 'react'
import {
  DASHBOARD_USERS,
  DASHBOARD_ACTIVITES,
  DASHBOARD_POPULAR_RECIPE,
  DASHBOARD_POPULAR_RESTAURANTS,
} from '@cookup/constant'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { CustomSortModal, Layout } from '@cookup/components'
import { CardContainers } from '../../components/components'

export const DashboardContainer = () => {
  const { isSortModal } = useSelector((state: any) => state.header)
  return (
    <React.Fragment>
      <Layout isTitle isSort mainHeight="auto">
        <CardContainers title="Users" data={DASHBOARD_USERS} />
        <Box mt={4}>
          <CardContainers title="Activity" data={DASHBOARD_ACTIVITES} />
        </Box>
        <Box mt={4}>
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
        </Box>
        {isSortModal && <CustomSortModal />}
      </Layout>
    </React.Fragment>
  )
}

export default DashboardContainer
