import React from 'react'
import { COLORS } from '@cookup/constant'
import { useDispatch } from 'react-redux'
import { useBreakpints } from '@cookup/hooks'
import { OPEN_EDIT_ADMIN_MODAL } from '@cookup/redux'
import { Box, Grid, IconButton, Typography } from '@mui/material'

interface CustomListProps {
  data?: any[]
  headerData?: string[]
  isBgColor?: boolean
  isActionButtons?: boolean
  isActionButton?: boolean
}

export const CustomList = (props: CustomListProps) => {
  const { data, headerData, isBgColor, isActionButtons, isActionButton } =
    props || {}

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
      <Grid item md={12} xs={12} my={1}>
        {data?.map((admin, index) => (
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
              bgcolor={COLORS.grey.dark}
            >
              <Grid item xs={3}>
                <Typography
                  variant={mobileMode ? 'body1' : 'subtitle1'}
                  color="secondary"
                >
                  {admin.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant={mobileMode ? 'body1' : 'subtitle1'}
                  color="secondary"
                >
                  {admin.email}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant={mobileMode ? 'body1' : 'subtitle1'}
                  color="secondary"
                >
                  {admin.role}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Box display="flex" justifyContent="flex-end">
                  {isActionButtons && (
                    <>
                      <IconButton
                        onClick={() => dispatch(OPEN_EDIT_ADMIN_MODAL())}
                      >
                        <img src="assets/icons/edit-icon.svg" alt="edit" />
                      </IconButton>
                      <IconButton>
                        <img src="assets/icons/delete-icon.svg" alt="delete" />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </>
        ))}
      </Grid>
    </Grid>
  )
}

export default CustomList
