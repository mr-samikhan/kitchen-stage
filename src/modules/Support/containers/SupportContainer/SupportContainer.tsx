import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { SET_TAB_VALUE } from '@cookup/redux'
import { TabsUI } from '../../components/components'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, MuiCustomTab } from '@cookup/components'

export const SupportContainer = () => {
  const dispatch = useDispatch()

  const { tabValue } = useSelector((state: any) => state.user)

  useEffect(() => {
    dispatch(SET_TAB_VALUE('reports'))
  }, [])
  return (
    <Layout
      isTitle
      isSort
      isFilter
      isFooter
      isExportCSV
      isPaginationIcons={tabValue !== 'suspended-users'}
    >
      <Grid container>
        <Grid item xs={12} display="flex" justifyContent="center">
          <MuiCustomTab
            width="180px"
            className="support-tabs"
            labels={[
              { label: 'Reports', value: 'reports' },
              { label: 'Suspended Users', value: 'suspended-users' },
              { label: 'Resolved', value: 'resolved' },
            ]}
          />
        </Grid>
        <Grid item md={12} mt={2} my={5}>
          <TabsUI tabValue={tabValue} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default SupportContainer
