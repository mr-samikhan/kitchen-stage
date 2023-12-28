import React from 'react'
import { Reports } from '../components'

interface TabsUIProps {
  tabValue?: string
}

export const TabsUI = (props: TabsUIProps) => {
  const { tabValue } = props || {}
  switch (tabValue) {
    case 'reports':
      return <Reports />
    case 'suspended-users':
      return <>Suspended Users</>
    case 'resolved':
      return <>Resolved</>

    default:
      break
  }
}

export default TabsUI
