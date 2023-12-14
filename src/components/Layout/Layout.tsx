import React from 'react'
import Header from './Header/Header'
import { Box, Grid } from '@mui/material'
import Sidebar from './Sidebar/Sidebar'
import { useBreakpints } from '@cookup/hooks'
import { useLocation } from 'react-router-dom'
import { COLORS, SIDEBAR_ARRAY } from '@cookup/constant'

interface LayoutProps {
  isTabs?: boolean
  isSort?: boolean
  isTitle?: boolean
  onGoBack?: () => void
  isDeleteBtn?: boolean
  isNavigation?: boolean
  isSearchInput?: boolean
  navigationTitle?: string
  isAddNewAdminBtn?: boolean
  children?: React.ReactNode
  isSuspendBtn?: 'Suspend' | 'Logout' | 'Unsuspend' | 'Create Ad'
}

export const Layout = (props: LayoutProps) => {
  const {
    isTabs,
    isSort,
    isTitle,
    onGoBack,
    children,
    isDeleteBtn,
    isSuspendBtn,
    isNavigation,
    isSearchInput,
    navigationTitle,
    isAddNewAdminBtn,
  } = props || {}

  const { pathname } = useLocation()
  const { mobileMode } = useBreakpints()

  const [isSideBar, setIsSideBar] = React.useState(false)

  let ARRAY = SIDEBAR_ARRAY
  let SELECTED_TITLE = ''

  ARRAY = ARRAY.map((item) => {
    if (pathname === item.path) {
      SELECTED_TITLE = item.title
      return { ...item, active: true }
    } else {
      return { ...item, active: false }
    }
  })

  const handleSideBar = () => setIsSideBar && setIsSideBar(!isSideBar)
  return (
    <React.Fragment>
      <Grid container minHeight={'100vh'}>
        {mobileMode ? (
          isSideBar && (
            <Box position="absolute" bgcolor={COLORS.background} zIndex={1000}>
              <Sidebar sideBarOptions={ARRAY} toggleSidebar={handleSideBar} />
            </Box>
          )
        ) : (
          <Grid item md={1} sm={1} bgcolor={COLORS.background}>
            <Sidebar sideBarOptions={ARRAY} />
          </Grid>
        )}
        <Grid
          item
          md={11}
          xs={12}
          sm={11}
          bgcolor={COLORS.white}
          px={{
            xs: 0,
            md: 2,
          }}
        >
          <Header
            isSort={isSort}
            isTabs={isTabs}
            isDeleteBtn={isDeleteBtn}
            isSuspendBtn={isSuspendBtn}
            isNavigation={isNavigation}
            isSearchInput={isSearchInput}
            toggleSidebar={handleSideBar}
            navigationTitle={navigationTitle}
            isAddNewAdminBtn={isAddNewAdminBtn}
            title={isTitle ? SELECTED_TITLE && SELECTED_TITLE : null}
          />
          <main>{children}</main>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Layout
