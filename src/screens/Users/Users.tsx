import React from 'react'
import { Layout } from '@muc/components'

export const Users = () => {
  return (
    <Layout
      isDeleteBtn
      isNavigation
      isSuspendBtn="Suspend"
      navigationTitle="Emma Gosling"
    >
      Users
    </Layout>
  )
}

export default Users
