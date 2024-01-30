import React from 'react'
import { CurrentAds } from '../components'

interface IAdsTypes {
  tabValue: string
  data: any[] | undefined
  selectedIndex: number | null
  onDeleteAd: (item: any) => void
  onSelectSingleAd: (item: any) => void
  setSelectedIndex: (index: number) => void
}

export const AdsTypes = (props: IAdsTypes) => {
  const {
    data,
    tabValue,
    onDeleteAd,
    selectedIndex,
    onSelectSingleAd,
    setSelectedIndex,
  } = props || {}

  switch (tabValue) {
    case 'current':
      return (
        <CurrentAds
          data={data}
          onDeleteAd={onDeleteAd}
          selectedIndex={selectedIndex}
          onSelectSingleAd={onSelectSingleAd}
          setSelectedIndex={setSelectedIndex}
        />
      )
    case 'expired':
      return (
        <CurrentAds
          data={data}
          onDeleteAd={onDeleteAd}
          selectedIndex={selectedIndex}
          onSelectSingleAd={onSelectSingleAd}
          setSelectedIndex={setSelectedIndex}
        />
      )
    case 'drafts':
      return (
        <CurrentAds
          data={data}
          onDeleteAd={onDeleteAd}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onSelectSingleAd={onSelectSingleAd}
        />
      )

    default:
      break
  }
}

export default AdsTypes
