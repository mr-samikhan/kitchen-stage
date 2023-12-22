import React from 'react'
import { COLORS } from '@cookup/constant'
import { useDispatch } from 'react-redux'
import { useBreakpints } from '@cookup/hooks'
import { TableFooter } from '@cookup/components'
import { ChevronRight } from '@mui/icons-material'
import { OPEN_EDIT_ADMIN_MODAL } from '@cookup/redux'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material'

interface CustomListProps {
  data?: any[]
  headerData?: string[]
  isPagination?: boolean
  isActionButton?: boolean
  isActionButtons?: boolean
  isBgColor?: string | undefined
  onDelete?: (name: string) => void
  onNavigation?: (item: any) => void
  iconPosition?: 'flex-start' | 'flex-end' | 'center'
}

export const CustomList = (props: CustomListProps) => {
  const {
    data,
    onDelete,
    isBgColor,
    headerData,
    isPagination,
    onNavigation,
    iconPosition,
    isActionButton,
    isActionButtons,
  } = props || {}

  const dispatch = useDispatch()
  const { mobileMode } = useBreakpints()

  return (
    <Grid
      container
      md={11}
      xs={12}
      display="flex"
      alignItems="center"
      px={{ xs: 1, md: 0 }}
    >
      <Grid item xs={12} px={{ md: 3, xs: 0 }} display="flex">
        {headerData?.map((header, index) => (
          <Grid item xs={3} key={index}>
            <Typography variant="body1" color={COLORS.grey.main}>
              {header}
            </Typography>
          </Grid>
        ))}
        <Grid item xs={3}></Grid>
      </Grid>
      <Grid item md={12} xs={12} my={1} minHeight={'50vh'}>
        {data?.slice(0, 8).map((user, index) => (
          <>
            <Grid
              item
              mt={1}
              px={3}
              xs={12}
              key={index}
              height={48}
              display="flex"
              alignItems="center"
              borderRadius="8px"
              bgcolor={isBgColor || COLORS.grey.dark}
            >
              {user.name && (
                <Grid item xs={3}>
                  <Typography
                    variant={mobileMode ? 'body1' : 'subtitle1'}
                    color="secondary"
                  >
                    {user.name}
                  </Typography>
                </Grid>
              )}
              {user.businessName && (
                <Grid item xs={3}>
                  <Typography
                    variant={mobileMode ? 'body1' : 'subtitle1'}
                    color="secondary"
                  >
                    {user.businessName}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={3}>
                <Typography
                  variant={mobileMode ? 'body1' : 'subtitle1'}
                  color="secondary"
                >
                  {user.email}
                </Typography>
              </Grid>
              {user.type && (
                <Grid item xs={3}>
                  <Typography
                    variant={mobileMode ? 'body1' : 'subtitle1'}
                    color="secondary"
                  >
                    {user.type}
                  </Typography>
                </Grid>
              )}
              {user.role && (
                <Grid item xs={3}>
                  <Typography
                    variant={mobileMode ? 'body1' : 'subtitle1'}
                    color="secondary"
                  >
                    {user.role}
                  </Typography>
                </Grid>
              )}
              {user.state && (
                <Grid item xs={3}>
                  <Typography
                    variant={mobileMode ? 'body1' : 'subtitle1'}
                    color="secondary"
                  >
                    {user.city}
                  </Typography>
                </Grid>
              )}
              {user.state && (
                <Grid item xs={3}>
                  <Typography
                    variant={mobileMode ? 'body1' : 'subtitle1'}
                    color="secondary"
                  >
                    {user.city}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={3}>
                <Box
                  display="flex"
                  justifyContent={
                    isActionButton
                      ? iconPosition || 'flex-start'
                      : iconPosition || 'flex-end'
                  }
                >
                  {isActionButtons && (
                    <>
                      <IconButton
                        onClick={() => dispatch(OPEN_EDIT_ADMIN_MODAL())}
                      >
                        <img src="/assets/icons/edit-icon.svg" alt="edit" />
                      </IconButton>
                      <IconButton
                        onClick={() => onDelete && onDelete(user?.name)}
                      >
                        <img src="/assets/icons/delete-icon.svg" alt="delete" />
                      </IconButton>
                    </>
                  )}
                  {isActionButton && (
                    <IconButton
                      onClick={() => onNavigation && onNavigation(user)}
                    >
                      <ChevronRight color="error" />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </Grid>
          </>
        ))}
      </Grid>
      {isPagination && <TableFooter isExportCSV isPaginationIcons />}
    </Grid>
  )
}

export default CustomList
