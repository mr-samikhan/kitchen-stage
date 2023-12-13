import React from 'react'
import { useBreakpints } from '@cookup/hooks'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import {
  MuiCustomTab,
  NavigationBar,
  MuiSmallButton,
  CustomFilterButton,
  MuiCustomSearchInput,
} from '@cookup/components'
import { useDispatch } from 'react-redux'
import { OPEN_SORT_MODAL } from '@cookup/redux'

interface HeaderProps {
  isTabs?: boolean
  isSort?: boolean
  isDeleteBtn?: boolean
  onGoBack?: () => void
  isNavigation?: boolean
  isSearchInput?: boolean
  navigationTitle?: string
  toggleSidebar?: () => void
  isAddNewAdminBtn?: boolean
  title?: string | null | undefined
  isSuspendBtn?: 'Suspend' | 'Logout' | 'Unsuspend' | 'Create Ad'
}

export const Header = (props: HeaderProps) => {
  const {
    title,
    isTabs,
    isSort,
    onGoBack,
    isDeleteBtn,
    isNavigation,
    isSuspendBtn,
    isSearchInput,
    toggleSidebar,
    navigationTitle,
    isAddNewAdminBtn,
  } = props || {}

  const { mobileMode, tabMode } = useBreakpints()

  const dispatch = useDispatch()

  return (
    <React.Fragment>
      {mobileMode && (
        <>
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
            <Typography variant="h1" textAlign="left">
              {title}
            </Typography>
            <Button variant="contained" color="primary">
              Add New Admin
            </Button>
          </Box>
        </>
      )}
      {!mobileMode && (
        <Grid
          container
          display="flex"
          alignItems="center"
          justifyContent="space-between"
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
            md={4}
            sm={title === null ? 6 : 12}
            p={{
              sm: 0,
              md: 4,
            }}
          >
            <Box display="flex" width="100%" justifyContent="center">
              {isSort && (
                <CustomFilterButton
                  onClick={() => dispatch(OPEN_SORT_MODAL())}
                />
              )}
              {isAddNewAdminBtn && (
                <Button variant="contained" color="primary">
                  Add New Admin
                </Button>
              )}
              {isSearchInput && (
                <Box width={tabMode ? '100%' : '80%'}>
                  <MuiCustomSearchInput />
                </Box>
              )}
              {isSuspendBtn && <MuiSmallButton btnText={isSuspendBtn} />}
              {isDeleteBtn && (
                <Box ml={2}>
                  <MuiSmallButton btnText="Delete" variant="outlined" />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}

export default Header
