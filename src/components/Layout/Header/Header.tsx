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
import { useDispatch, useSelector } from 'react-redux'
import {
  OPEN_ADMIN_MODAL,
  OPEN_SORT_MODAL,
  SET_DELETE_MODAL,
  SET_SUSPEND_MODAL,
  SET_UNSUSPEND_USER,
} from '@cookup/redux'

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
  const { isUserSuspened } = useSelector((state: any) => state.header)

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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => dispatch(OPEN_ADMIN_MODAL())}
                >
                  Add New Admin
                </Button>
              )}
              {isSearchInput && (
                <Box width={tabMode ? '100%' : '80%'}>
                  <MuiCustomSearchInput />
                </Box>
              )}
              {isSuspendBtn && (
                <MuiSmallButton
                  btnText={isSuspendBtn}
                  onClick={() =>
                    dispatch(
                      isUserSuspened
                        ? SET_UNSUSPEND_USER(true)
                        : SET_SUSPEND_MODAL(true)
                    )
                  }
                />
              )}
              {isDeleteBtn && (
                <Box ml={2}>
                  <MuiSmallButton
                    btnText="Delete"
                    variant="outlined"
                    onClick={() => dispatch(SET_DELETE_MODAL(true))}
                  />
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
