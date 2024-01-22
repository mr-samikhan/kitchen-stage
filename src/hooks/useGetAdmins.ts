import React from 'react'
import { Api } from '@cookup/services'
import { useQuery } from 'react-query'

interface IgetAdmins {
  enabled?: boolean
}

const useGetAdmins = (props: IgetAdmins) => {
  const { enabled = true } = props || {}

  const { isLoading: adminLoading, data: admins } = useQuery(
    ['getAdmins'],
    Api.admin.getAdmins,
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
    }
  )

  return {
    admins,
    adminLoading,
  }
}

export default useGetAdmins
