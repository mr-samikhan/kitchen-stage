import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, IconButton, Typography } from '@mui/material'
import { OPEN_SORT_MODAL, SET_FILTER_MODAL } from '@cookup/redux'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import {
  MuiCustomTab,
  NavigationBar,
  CustomFilterButton,
  MuiCustomSearchInput,
} from '@cookup/components'

interface MobileProps {
  button1Icon?: any
  button2Icon?: any
  isTabs?: boolean
  isSort?: boolean
  isFilter?: boolean
  onGoBack?: () => void
  showButton1?: boolean
  showButton2?: boolean
  button1Text?: string
  button2Text?: string
  button1Type?: string
  button2Type?: string
  isNavigation?: boolean
  isSearchInput?: boolean
  navigationTitle?: string
  toggleSidebar?: () => void
  isAddNewAdminBtn?: boolean
  button1ClassName?: string
  button2ClassName?: string
  onButton1Click?: () => void
  onButton2Click?: () => void
  title?: string | null | undefined
}

export const MobileHeader = (props: MobileProps) => {
  const {
    title,
    isTabs,
    isSort,
    onGoBack,
    isFilter,
    isNavigation,
    showButton1,
    showButton2,
    button1Icon,
    button2Icon,
    isSearchInput,
    toggleSidebar,
    onButton2Click,
    onButton1Click,
    navigationTitle,
  } = props || {}
  const dispatch = useDispatch()
  return (
    <React.Fragment>
      <Box
        p={2}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton onClick={toggleSidebar}>
          <RestaurantMenuIcon />
        </IconButton>
        {isNavigation && (
          <NavigationBar
            onGoBack={onGoBack}
            navigationTitle={navigationTitle}
          />
        )}
        <Typography variant="h1" textAlign="left">
          {title}
        </Typography>
        <Box display="flex" gap={2}>
          {isSort && (
            <CustomFilterButton onClick={() => dispatch(OPEN_SORT_MODAL())} />
          )}
          {isFilter && (
            <CustomFilterButton
              placeholder="Filter"
              icon="/assets/icons/filter_alt.svg"
              onClick={() => dispatch(SET_FILTER_MODAL(true))}
            />
          )}
          {showButton1 && (
            <IconButton onClick={onButton1Click}>
              {typeof button1Icon === 'string' ? (
                <img src={button1Icon} alt="" />
              ) : (
                button1Icon
              )}
            </IconButton>
          )}
          {showButton2 && (
            <IconButton onClick={onButton2Click}>
              {typeof button2Icon === 'string' ? (
                <img src={button2Icon} alt="" />
              ) : (
                button2Icon
              )}
            </IconButton>
          )}
        </Box>
      </Box>
      {isTabs && (
        <Box width="100%" display="flex" justifyContent="center">
          <MuiCustomTab />
        </Box>
      )}
      {isSearchInput && (
        <Box width={'100%'} py={2}>
          <MuiCustomSearchInput />
        </Box>
      )}
    </React.Fragment>
  )
}

export default MobileHeader
