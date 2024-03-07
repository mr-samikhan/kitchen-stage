import React from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDashboard } from '@cookup/modules'
import { CardContainers } from '../../components/components'
import { CustomLoader, CustomSortModal, Layout } from '@cookup/components'
import { DASHBOARD_USERS, DASHBOARD_ACTIVITES, COLORS } from '@cookup/constant'

export const DashboardContainer = () => {
  const { isSortModal } = useSelector((state: any) => state.header)

  const { filterLoading, data, isLoading } = useDashboard()

  if (isLoading) {
    return <CustomLoader />
  }
  return (
    <React.Fragment>
      <Layout isTitle isSort mainHeight="auto" bgcolor={COLORS.background}>
        <CardContainers
          isLoading={filterLoading}
          title="Users"
          data={DASHBOARD_USERS.map((item) => {
            if (item.title === 'Registered Users') {
              return {
                ...item,
                counter: data?.activeUsersCount || 0,
                percentage: data?.activePercentageChange || 0,
              }
            }
            if (item.title === 'Deactivated Users') {
              return {
                ...item,
                counter: data?.deactivatedUsersCount || 0,
                percentage: data?.deactivePercentageChange || 0,
              }
            }
          })}
        />
        <Box mt={4}>
          <CardContainers
            isLoading={filterLoading}
            title="Activity"
            data={DASHBOARD_ACTIVITES.map((item) =>
              item.id === 1
                ? {
                    ...item,
                    counter: data?.totalRecipesCount || 0,
                    percentage: data?.recipePercenatgeChange || 0,
                  }
                : item.id === 2
                ? {
                    ...item,
                    counter: data?.totalComments || 0,
                    percentage: data?.commentsPercentageChange || 0,
                  }
                : item.id === 3
                ? {
                    ...item,
                    counter: data?.totalLikesCount || 0,
                    percentage: data?.likesPercentageChange || 0,
                  }
                : item.id === 4
                ? {
                    ...item,
                    counter: data?.totalFollowedBy || 0,
                    percentage: data?.followedByPercentageChange || 0,
                  }
                : item
            )}
          />
        </Box>
        {/* <Box mt={4}>
          <CardContainers
            title="Business Account Activity"
            data={DASHBOARD_BUSINESS_ACTIVITES}
          />
        </Box> */}
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
