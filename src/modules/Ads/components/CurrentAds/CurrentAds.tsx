import React from 'react'
import { AdsCard } from '../components'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'

interface ICurrentAds {
  data: any[] | undefined
  selectedIndex: number | null
  onDeleteAd: (item: any) => void
  onSelectSingleAd: (item: any) => void
  setSelectedIndex: (index: any) => void
}

export const CurrentAds = (props: ICurrentAds) => {
  const {
    data,
    onDeleteAd,
    selectedIndex,
    onSelectSingleAd,
    setSelectedIndex,
  } = props || {}

  const [selectedLable, setSelectedLable] = React.useState<string | null>(null)
  const { tabValue } = useSelector((state: any) => state.user)

  return (
    <React.Fragment>
      {!data?.length && (
        <Grid container justifyContent="center">
          <Typography color="primary" variant="h5">
            No Ads Found
          </Typography>
        </Grid>
      )}
      {data?.map((item, index) => (
        <AdsCard
          data_={item}
          index={index}
          title={item.adName}
          onDeleteAd={onDeleteAd}
          img={item.image.fileUrl}
          clickRate={item.clickRate}
          selectedLable={selectedLable}
          selectedIndex={selectedIndex}
          onSelectSingleAd={onSelectSingleAd}
          isTooltip={index === selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setSelectedLable={setSelectedLable}
          data={
            tabValue === 'drafts' ? ['Edit', 'Duplicate', 'Delete'] : undefined
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
