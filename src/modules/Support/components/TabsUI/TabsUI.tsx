import React from 'react'
import { Reports, SuspendedUsers } from '../components'

interface TabsUIProps {
  data: any
  tabValue?: string
}

export const TabsUI = (props: TabsUIProps) => {
  const { tabValue, data } = props || {}

  switch (tabValue) {
    case 'reports':
      return <Reports data={data} />
    case 'suspended-users':
      return (
        <SuspendedUsers
          data={data}
          hiddenKeys={['id', 'uid', 'gender', 'dateOfBirth']}
        />
      )
    case 'resolved':
      return <Reports data={data} />

    default:
      break
  }
}

export default TabsUI
