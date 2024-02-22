import React from 'react'
import { SUPPORT_HIDDEN_KEYS } from '@cookup/constant'
import { Reports, SuspendedUsers } from '../components'

interface TabsUIProps {
  data: any
  tabValue?: string
}

export const TabsUI = (props: TabsUIProps) => {
  const { tabValue, data } = props || {}

  switch (tabValue) {
    case 'reports':
      return <Reports data={data} hiddenKeys={SUPPORT_HIDDEN_KEYS} />
    case 'suspended-users':
      return (
        <SuspendedUsers
          data={data}
          hiddenKeys={['userName', 'email', 'experience', 'city', 'zipCode']}
        />
      )
    case 'resolved':
      return <Reports data={data} hiddenKeys={SUPPORT_HIDDEN_KEYS} />

    default:
      break
  }
}

export default TabsUI
