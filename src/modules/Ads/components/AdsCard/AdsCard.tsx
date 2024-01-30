import React from 'react'
import { COLORS } from '@cookup/constant'
import { Box, IconButton, Typography } from '@mui/material'

interface IAddCard {
  data_?: any
  img: string
  title: string
  index: number
  clickRate: any
  isTooltip: boolean
  onIconClick: () => void
  data?: string[] | undefined
  selectedIndex: number | null
  selectedLable: string | null
  onDeleteAd: (item: any) => void
  onSelectSingleAd: (item: any) => void
  setSelectedIndex: (index: any) => void
  setSelectedLable: (index: string) => void
}

export const AdsCard = (props: IAddCard) => {
  const {
    img,
    data,
    title,
    data_,
    isTooltip,
    clickRate,
    onDeleteAd,
    onIconClick,
    selectedLable,
    onSelectSingleAd,
    setSelectedIndex,
    setSelectedLable,
  } = props || {}

  let ARRAY_CHECK = data ? data : ['Duplicate', 'Delete']

  return (
    <React.Fragment>
      <Box width={272} id="tooltip">
        <Box borderRadius="16px" position="relative" height={272}>
          {isTooltip && (
            <Box
              top={50}
              right={12}
              width={172}
              position="absolute"
              borderRadius="8px"
              p="12px 16px 12px 16px"
              bgcolor={COLORS.secondary.light}
            >
              {ARRAY_CHECK.map((item) => (
                <Box
                  key={item}
                  width={140}
                  height={24}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (item === 'Delete') {
                      onDeleteAd(data_)
                    } else if (item === 'Duplicate') {
                      onSelectSingleAd(data_)
                    } else if (item === 'Edit') {
                      console.log('Edit')
                    }
                    setSelectedLable(item)
                    setSelectedIndex(null)
                  }}
                  bgcolor={selectedLable === item ? COLORS.secondary.main : ''}
                >
                  <Typography
                    variant="h6"
                    fontFamily="Poppins"
                    color={COLORS.white}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          <Box position="absolute" right={0} p={2} onClick={onIconClick}>
            <IconButton>
              <img src="/assets/icons/more-hor.svg" alt="more" />
            </IconButton>
          </Box>
          <img
            src={img}
            alt=""
            width="100%"
            height="100%"
            style={{
              borderRadius: '8px',
            }}
          />
        </Box>
        <Typography py={0.5} variant="h5" color="primary" fontFamily="Poppins">
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary"
          fontFamily="Poppins"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Typography
            variant="subtitle1"
            color={clickRate < 0 ? 'error' : COLORS.success}
          >
            {`${clickRate}%`}
          </Typography>
          clickrate vs last week
        </Typography>
      </Box>
    </React.Fragment>
  )
}

export default AdsCard
