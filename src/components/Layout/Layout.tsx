import React from 'react'
import Header from './Header/Header'
import { Grid } from '@mui/material'
import Sidebar from './Sidebar/Sidebar'
import { useBreakpints } from '@muc/hooks'
import { useLocation } from 'react-router-dom'
import { COLORS, SIDEBAR_ARRAY } from '@muc/constant'

interface LayoutProps {
  children?: React.ReactNode
}

export const Layout = (props: LayoutProps) => {
  const { children } = props || {}

  const { mobileMode } = useBreakpints()
  const { pathname } = useLocation()

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
  return (
    <React.Fragment>
      <Grid container minHeight={'100vh'}>
        {mobileMode ? null : (
          <Grid item md={1} bgcolor={COLORS.background}>
            <Sidebar sideBarOptions={ARRAY} />
          </Grid>
        )}
        <Grid item md={11} bgcolor={COLORS.white} px={4}>
          <Header title={SELECTED_TITLE && SELECTED_TITLE} />
          <main>{children}</main>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Layout
