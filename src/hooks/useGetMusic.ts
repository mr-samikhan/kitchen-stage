import React from 'react'
import { Api } from '@cookup/services'
import { useQuery } from 'react-query'

interface IgetAdmins {
  enabled?: boolean
}

const useGetMusic = (props: IgetAdmins) => {
  const { enabled = true } = props || {}

  const { isLoading: musicLoading, data: musics } = useQuery<any>(
    ['getMusics'],
    Api.music.getMusics,
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
    }
  )

  return {
    musics,
    musicLoading,
  }
}

export default useGetMusic
