import React from 'react'
import { CurrentAds, DraftAds, ExpiredAds } from '../components'

interface IAdsTypes {
  tabValue: string
  selectedIndex: number | null
  setSelectedIndex: (index: number) => void
}

export const AdsTypes = (props: IAdsTypes) => {
  const { tabValue, selectedIndex, setSelectedIndex } = props || {}

  switch (tabValue) {
    case 'current':
      return (
        <CurrentAds
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )
    case 'expired':
      return (
        <CurrentAds
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )
    case 'drafts':
      return (
        <CurrentAds
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )

    default:
      break
  }
}

export default AdsTypes
