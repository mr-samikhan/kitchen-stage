import React from 'react'
import Header from './Header/Header'
import { Box, Grid } from '@mui/material'
import Sidebar from './Sidebar/Sidebar'
import { useBreakPoints } from '@cookup/hooks'
import { useLocation } from 'react-router-dom'
import { TableFooter } from '@cookup/components'
import { COLORS, SIDEBAR_ARRAY } from '@cookup/constant'

interface LayoutProps {
  title?: string
  bgcolor?: string
  isTabs?: boolean
  isSort?: boolean
  isExportCSV?: any
  isTitle?: boolean
  isFooter?: boolean
  isFilter?: boolean
  mainHeight?: string
  navTitleColor?: string
  onGoBack?: () => void
  isNavigation?: boolean
  isSearchInput?: boolean
  navigationTitle?: string
  children?: React.ReactNode
  isPaginationIcons?: boolean
  showButton1?: boolean
  showButton2?: boolean
  button1Text?: string
  button2Text?: string
  button1Type?: string
  button2Type?: string
  button1Icon?: any
  button2Icon?: any
  onNextPage?: any
  onPreviousPage?: any
  button1Variant?: 'contained' | 'outlined'
  button2Variant?: 'contained' | 'outlined'
  button1Size?: 'small' | 'large' | 'medium'
  button2Size?: 'small' | 'large' | 'medium'
  button1ClassName?: string
  button2ClassName?: string
  onButton1Click?: any
  onButton2Click?: (res: any) => void
}

export const Layout = (props: LayoutProps) => {
  const {
    title,
    isTabs,
    isSort,
    bgcolor,
    isTitle,
    onGoBack,
    children,
    isFilter,
    isFooter,
    mainHeight,
    onNextPage,
    isExportCSV,
    isNavigation,
    isSearchInput,
    navTitleColor,
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
    button1Variant,
    onPreviousPage,
    button2Variant,
    onButton1Click,
    onButton2Click,
    navigationTitle,
    button1ClassName,
    button2ClassName,
    isPaginationIcons,
  } = props || {}

  const { pathname } = useLocation()
  const { mobileMode } = useBreakPoints()

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
            isFilter={isFilter}
            onGoBack={onGoBack}
            navTitleColor={navTitleColor}
            button1Size={button1Size}
            button2Size={button2Size}
            showButton1={showButton1}
            showButton2={showButton2}
            button1Icon={button1Icon}
            button1Type={button1Type}
            button1Text={button1Text}
            button2Icon={button2Icon}
            button2Type={button2Type}
            button2Text={button2Text}
            isNavigation={isNavigation}
            isSearchInput={isSearchInput}
            toggleSidebar={handleSideBar}
            onButton2Click={onButton2Click}
            onButton1Click={onButton1Click}
            button2Variant={button2Variant}
            button1Variant={button1Variant}
            navigationTitle={navigationTitle}
            button1ClassName={button1ClassName}
            button2ClassName={button2ClassName}
            title={isTitle ? SELECTED_TITLE && SELECTED_TITLE : title}
          />
          <main
            style={{
              overflowY: 'auto',
              maxHeight:
                mainHeight ||
                `calc(100vh - ${isFooter ? 120 * 2 : 120 * 1}px )`,
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
                onNextPage={onNextPage && onNextPage}
                isPaginationIcons={isPaginationIcons}
                onPreviousPage={onPreviousPage && onPreviousPage}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Layout
