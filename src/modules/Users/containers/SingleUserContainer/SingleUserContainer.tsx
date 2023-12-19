import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Layout, TableFooter } from '@cookup/components'

export const SingleUserContainer = () => {
  const navigate = useNavigate()
  return (
    <Layout
      isDeleteBtn
      isNavigation
      isSuspendBtn="Suspend"
      navigationTitle="Emma Gosling"
      onGoBack={() => navigate(-1)}
    >
      <Box
        display="flex"
        minHeight="80vh"
        flexDirection="column"
        justifyContent="space-between"
      >
        <TableFooter isExportCSV />
      </Box>
    </Layout>
  )
}

export default SingleUserContainer
