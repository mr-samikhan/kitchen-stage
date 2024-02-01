import { Api } from '@cookup/services'
import React, { useEffect } from 'react'
import { useQuery, QueryKey } from 'react-query'

interface IGetAds {
  value: string
  enabled?: boolean
}

interface UseGetAdsResult {
  isFetching: boolean
  getSupports: () => void
  supportLoading: boolean
  support_data: any[] | undefined
}

export const useGetSupports = (props: IGetAds): UseGetAdsResult => {
  const { enabled = true, value } = props || {}

  const getSupportQuery = (param: string): Promise<any> => {
    return Api.support.getSupports(param)
  }

  const {
    refetch,
    isFetching,
    data: support_data,
    isLoading: supportLoading,
  } = useQuery<any[], Error>(
    ['getSupports' as QueryKey],
    () => getSupportQuery(value),
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    refetch()
  }, [value, refetch])

  return {
    isFetching,
    support_data,
    supportLoading,
    getSupports: refetch,
  }
}

export default useGetSupports
