import React from 'react'
import { Api } from '@cookup/services'
import { useQuery } from 'react-query'

interface IgetAdmins {
  enabled?: boolean
}

const useGetUsers = (props: IgetAdmins) => {
  const { enabled = true } = props || {}

  const { isLoading: usersLoading, data: users } = useQuery<any>(
    ['getUsers'],
    Api.user.getUsers,
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
    }
  )

  return {
    users,
    usersLoading,
  }
}

export default useGetUsers
