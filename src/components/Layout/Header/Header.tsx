import React from 'react'
import { useBreakPoints } from '@cookup/hooks'
import { Box, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import MobileHeader from '../MobileHeader/MobileHeader'
import { OPEN_SORT_MODAL, SET_FILTER_MODAL } from '@cookup/redux'
import {
  MuiCustomTab,
  NavigationBar,
  MuiSmallButton,
  CustomFilterButton,
  MuiCustomSearchInput,
} from '@cookup/components'
import { formatStartEndDate } from '@cookup/helpers'

interface HeaderProps {
  button1Icon?: any
  button2Icon?: any
  isTabs?: boolean
  isSort?: boolean
  isFilter?: boolean
  navTitleColor?: string
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
  onButton2Click?: (data: any) => void
  title?: string | null | undefined
  button1Variant?: 'contained' | 'outlined'
  button2Variant?: 'contained' | 'outlined'
  button1Size?: 'small' | 'large' | 'medium'
  button2Size?: 'small' | 'large' | 'medium'
}

export const Header = (props: HeaderProps) => {
  const {
    title,
    isTabs,
    isSort,
    onGoBack,
    isFilter,
    navTitleColor,
    isNavigation,
    isSearchInput,
    toggleSidebar,
    navigationTitle,
    showButton1,
    showButton2,
    button1Icon,
    button2Icon,
    button1Text,
    button2Text,
    button1Type,
    button2Type,
    button1Size,
    button2Size,
    onButton2Click,
    onButton1Click,
    button2Variant,
    button1Variant,
    button1ClassName,
    button2ClassName,
  } = props || {}

  const { mobileMode, tabMode } = useBreakPoints()

  const dispatch = useDispatch()

  const { pathname } = window.location

  let post_path = pathname === '/posts'
  let songs_path = pathname === '/songs'

  const { startDate, endDate } = useSelector((state: any) => state.user)

  return (
    <React.Fragment>
      {mobileMode && (
        <MobileHeader
          title={title}
          isSort={isSort}
          isTabs={isTabs}
          isFilter={isFilter}
          onGoBack={onGoBack}
          showButton1={showButton1}
          showButton2={showButton2}
          button1Icon={button1Icon}
          button2Icon={button2Icon}
          isNavigation={isNavigation}
          toggleSidebar={toggleSidebar}
          isSearchInput={isSearchInput}
          onButton1Click={onButton1Click}
          onButton2Click={onButton2Click}
          navigationTitle={navigationTitle}
        />
      )}
      {songs_path && (
        <Grid item md={12} sm={6} p={{ md: 1, xs: 0 }} my={{ md: 2, xs: 0 }}>
          <Typography variant="h1" textAlign="center">
            Music
          </Typography>
        </Grid>
      )}
      {!mobileMode && !songs_path && (
        <Grid
          container
          display="flex"
          alignItems="center"
          justifyContent={post_path ? 'start' : 'space-between'}
        >
          <Grid item md={4} sm={6} p={4}>
            {isTabs && (
              <Box width="60%">
                <MuiCustomTab />
              </Box>
            )}
            {isNavigation && (
              <NavigationBar
                onGoBack={onGoBack}
                navTitleColor={navTitleColor}
                navigationTitle={navigationTitle}
              />
            )}
          </Grid>
          {title && (
            <>
              <Grid item md={4} sm={6} p={4}>
                <Typography variant="h1" textAlign="left">
                  {title}
                </Typography>
              </Grid>
            </>
          )}
          <Grid
            item
            md={post_path ? 8 : 4}
            sm={title === null ? 6 : 12}
            p={{
              sm: 0,
              md: 4,
            }}
          >
            <Box display="flex" width="100%" justifyContent="center" gap={2}>
              {isSearchInput && (
                <Box width={post_path ? '50%' : tabMode ? '100%' : '80%'}>
                  <MuiCustomSearchInput
                    placeholder={post_path ? 'Search Posts' : ''}
                  />
                </Box>
              )}
              {isSort && (
                <CustomFilterButton
                  onClick={() => dispatch(OPEN_SORT_MODAL())}
                  className={startDate && endDate ? 'filter-filled' : 'filter'}
                  value={
                    startDate && endDate
                      ? formatStartEndDate(startDate, endDate)
                      : 'Today'
                  }
                />
              )}
              {isFilter && (
                <CustomFilterButton
                  placeholder="Filter"
                  icon="/assets/icons/filter_alt.svg"
                  onClick={() => dispatch(SET_FILTER_MODAL(true))}
                />
              )}
              {showButton1 && (
                <MuiSmallButton
                  icon={button1Icon}
                  type={button1Type}
                  btnText={button1Text}
                  onClick={onButton1Click}
                  variant={button1Variant}
                  className={button1ClassName}
                  size={button1Size}
                />
              )}
              {showButton2 && (
                <MuiSmallButton
                  icon={button2Icon}
                  type={button2Type}
                  btnText={button2Text}
                  onClick={onButton2Click}
                  variant={button2Variant}
                  className={button2ClassName}
                  size={button2Size}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}

export default Header
