import React from 'react'
import { EmailUI, PasswordUI } from '../components'

interface SettingsTabsUIProps {
  methods: any
  tabValue: string
  isValid?: boolean
  isLoading?: boolean
}

export const SettingsTabsUI = (props: SettingsTabsUIProps) => {
  const { tabValue, isValid, methods, isLoading } = props || {}
  switch (tabValue) {
    case 'email':
      return (
        <EmailUI isValid={isValid} methods={methods} isLoading={isLoading} />
      )
    case 'password':
      return <PasswordUI isValid={isValid} isLoading={isLoading} />
    default:
      break
  }
}

export default SettingsTabsUI
