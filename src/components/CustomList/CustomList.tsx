import React from 'react'
import { COLORS } from '@cookup/constant'
import { useDispatch } from 'react-redux'
import { useBreakpints } from '@cookup/hooks'
import { ChevronRight } from '@mui/icons-material'
import { OPEN_EDIT_ADMIN_MODAL } from '@cookup/redux'
import { Box, Grid, IconButton, Typography } from '@mui/material'

interface CustomListProps {
  data?: any[]
  icon?: string
  height?: number
  headerData?: string[]
  isActionButton?: boolean
  isActionButtons?: boolean
  isBgColor?: string | undefined
  onDelete?: (name: string) => void
  onNavigation?: (item: any) => void
  iconPosition?: 'flex-start' | 'flex-end' | 'center'
}

const CustomList: React.FC<CustomListProps> = (props) => {
  const {
    data,
    icon,
    height,
    onDelete,
    isBgColor,
    headerData,
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
      <Grid item md={12} xs={12} my={1} height={height}>
        {data?.slice(0, 8).map((user, index) => (
          <React.Fragment key={index}>
            <Grid
              item
              mt={1}
              px={3}
              xs={12}
              key={index}
              height={40}
              display="flex"
              alignItems="center"
              borderRadius="8px"
              bgcolor={isBgColor || COLORS.grey.dark}
            >
              {Object.keys(user).map((key) => (
                <Grid item xs={3} key={key}>
                  <Typography
                    variant={mobileMode ? 'body1' : 'subtitle1'}
                    color="secondary"
                  >
                    {user[key]}
                  </Typography>
                </Grid>
              ))}
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
                  {user.viewMessage && (
                    <Grid item xs={12}>
                      <Typography
                        color="secondary"
                        variant={mobileMode ? 'body1' : 'subtitle1'}
                      >
                        {user.viewMessage}
                      </Typography>
                    </Grid>
                  )}
                  {isActionButton && (
                    <IconButton
                      onClick={() => onNavigation && onNavigation(user)}
                    >
                      {icon ? (
                        <img src={icon} alt="" />
                      ) : (
                        <ChevronRight color="error" />
                      )}
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  )
}

export default CustomList
