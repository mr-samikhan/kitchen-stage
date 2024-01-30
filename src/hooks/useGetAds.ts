import { Api } from '@cookup/services'
import React, { useEffect } from 'react'
import { useQuery, QueryKey } from 'react-query'

interface IGetAds {
  value: string
  enabled?: boolean
}

interface UseGetAdsResult {
  isFetching: boolean
  getAds: () => void
  adsLoading: boolean
  ads: any[] | undefined
}

export const useGetAds = (props: IGetAds): UseGetAdsResult => {
  const { enabled = true, value } = props || {}

  const getAdsQuery = (param: string): Promise<any> => {
    return Api.ads.getAds(param)
  }

  const {
    isLoading: adsLoading,
    data: ads,
    refetch,
    isFetching,
  } = useQuery<any[], Error>(['getAds' as QueryKey], () => getAdsQuery(value), {
    enabled: enabled,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    refetch()
  }, [value, refetch])

  return {
    ads,
    adsLoading,
    isFetching,
    getAds: refetch,
  }
}

export default useGetAds
