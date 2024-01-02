import React from 'react'
import { AdsCard } from '../components'
import { useSelector } from 'react-redux'
import { ADS_CARD_DATA } from '@cookup/constant'

interface ICurrentAds {
  selectedIndex: number | null
  setSelectedIndex: (index: any) => void
}

export const CurrentAds = (props: ICurrentAds) => {
  const { selectedIndex, setSelectedIndex } = props || {}

  const [selectedLable, setSelectedLable] = React.useState<string | null>(null)
  const { tabValue } = useSelector((state: any) => state.user)

  return (
    <React.Fragment>
      {ADS_CARD_DATA.map((item, index) => (
        <AdsCard
          index={index}
          img={item.img}
          title={item.title}
          clickRate={item.clickRate}
          selectedLable={selectedLable}
          selectedIndex={selectedIndex}
          isTooltip={index === selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setSelectedLable={setSelectedLable}
          data={
            tabValue === 'drafts' ? ['Duplicate', 'Delete', 'Edit'] : undefined
          }
          onIconClick={() => {
            if (selectedIndex === index) {
              setSelectedIndex(null)
            } else {
              setSelectedIndex(index)
            }
          }}
        />
      ))}
    </React.Fragment>
  )
}

export default CurrentAds
