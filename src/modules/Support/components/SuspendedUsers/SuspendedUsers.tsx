import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomList } from '@cookup/components'
import {
  ROUTES,
  SUPPORT_SUSPENDED_DATA,
  SUPPORT_SUSPENDED_HEADER,
} from '@cookup/constant'

export const SuspendedUsers = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <CustomList
        height={400}
        isActionButton
        iconPosition="flex-end"
        data={SUPPORT_SUSPENDED_DATA}
        headerData={SUPPORT_SUSPENDED_HEADER}
        onNavigation={() => navigate(ROUTES.USERS)}
      />
    </React.Fragment>
  )
}

export default SuspendedUsers
