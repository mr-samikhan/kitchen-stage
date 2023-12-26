import React from 'react'
import Header from './Header/Header'
import { Box, Grid } from '@mui/material'
import Sidebar from './Sidebar/Sidebar'
import { useBreakpints } from '@cookup/hooks'
import { useLocation } from 'react-router-dom'
import { TableFooter } from '@cookup/components'
import { COLORS, SIDEBAR_ARRAY } from '@cookup/constant'

interface LayoutProps {
  bgcolor?: string
  isTabs?: boolean
  isSort?: boolean
  isTitle?: boolean
  isFooter?: boolean
  mainHeight?: string
  isExportCSV?: boolean
  onGoBack?: () => void
  isDeleteBtn?: boolean
  isNavigation?: boolean
  isSearchInput?: boolean
  navigationTitle?: string
  isAddNewAdminBtn?: boolean
  children?: React.ReactNode
  isPaginationIcons?: boolean
  isSuspendBtn?: 'Suspend' | 'Logout' | 'Unsuspend' | 'Create Ad'
}

export const Layout = (props: LayoutProps) => {
  const {
    isTabs,
    isSort,
    bgcolor,
    isTitle,
    onGoBack,
    children,
    isFooter,
    mainHeight,
    isExportCSV,
    isDeleteBtn,
    isSuspendBtn,
    isNavigation,
    isSearchInput,
    navigationTitle,
    isAddNewAdminBtn,
    isPaginationIcons,
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
          <Grid
            item
            md={1}
            sm={1}
            maxHeight="900px"
            bgcolor={COLORS.background}
          >
            <Sidebar sideBarOptions={ARRAY} />
          </Grid>
        )}
        <Grid
          item
          md={11}
          xs={12}
          sm={11}
          bgcolor={bgcolor || COLORS.white}
          px={{
            xs: 1,
            md: 2,
          }}
        >
          <Header
            isSort={isSort}
            isTabs={isTabs}
            onGoBack={onGoBack}
            isDeleteBtn={isDeleteBtn}
            isSuspendBtn={isSuspendBtn}
            isNavigation={isNavigation}
            isSearchInput={isSearchInput}
            toggleSidebar={handleSideBar}
            navigationTitle={navigationTitle}
            isAddNewAdminBtn={isAddNewAdminBtn}
            title={isTitle ? SELECTED_TITLE && SELECTED_TITLE : null}
          />
          <main
            style={{
              overflowY: 'auto',
              maxHeight: mainHeight || `calc(100vh - ${120 * 2}px )`,
            }}
          >
            {children}
          </main>
          {isFooter && (
            <Grid
              container
              md={11}
              xs={12}
              mt={2}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              px={{ xs: 1, md: 0 }}
            >
              <TableFooter
                isExportCSV={isExportCSV}
                isPaginationIcons={isPaginationIcons}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Layout
