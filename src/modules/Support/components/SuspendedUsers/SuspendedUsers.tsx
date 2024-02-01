import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomList } from '@cookup/components'
import {
  ROUTES,
  SUPPORT_SUSPENDED_DATA,
  SUPPORT_SUSPENDED_HEADER,
} from '@cookup/constant'

interface SuspendedUsersProps {
  data: any
  hiddenKeys?: string[]
}

export const SuspendedUsers = (props: SuspendedUsersProps) => {
  const { data, hiddenKeys } = props || {}

  const navigate = useNavigate()
  return (
    <React.Fragment>
      <CustomList
        data={data}
        height={400}
        isActionButton
        hiddenKeys={hiddenKeys}
        iconPosition="flex-end"
        headerData={SUPPORT_SUSPENDED_HEADER}
        onNavigation={() => navigate(ROUTES.USERS)}
      />
    </React.Fragment>
  )
}

export default SuspendedUsers
