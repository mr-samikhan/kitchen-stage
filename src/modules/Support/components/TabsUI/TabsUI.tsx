import React from 'react'
import { Reports, SuspendedUsers } from '../components'

interface TabsUIProps {
  tabValue?: string
}

export const TabsUI = (props: TabsUIProps) => {
  const { tabValue } = props || {}
  switch (tabValue) {
    case 'reports':
      return <Reports />
    case 'suspended-users':
      return <SuspendedUsers />
    case 'resolved':
      return <Reports />

    default:
      break
  }
}

export default TabsUI
