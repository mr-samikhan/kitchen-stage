import React from 'react'
import { EmailUI, PasswordUI } from '../components'

interface SettingsTabsUIProps {
  tabValue: string
  isValid?: boolean
}

export const SettingsTabsUI = (props: SettingsTabsUIProps) => {
  const { tabValue, isValid } = props || {}
  switch (tabValue) {
    case 'email':
      return <EmailUI isValid={isValid} />
    case 'password':
      return <PasswordUI isValid={isValid} />
    default:
      break
  }
}

export default SettingsTabsUI
