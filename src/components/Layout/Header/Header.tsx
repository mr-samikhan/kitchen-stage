import React from 'react'
import { useBreakPoints } from '@cookup/hooks'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { Box, Grid, IconButton, Typography } from '@mui/material'
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
  SET_FILTER_MODAL,
  SET_LOGOUT_MODAL,
  SET_SUSPEND_MODAL,
  SET_UNSUSPEND_USER,
} from '@cookup/redux'

interface HeaderProps {
  isTabs?: boolean
  isSort?: boolean
  onDelete?: () => void
  isFilter?: boolean
  isDeleteBtn?: boolean
  isLogoutBtn?: 'Logout'
  isReviewBtn?: 'Review'
  onGoBack?: () => void
  isNavigation?: boolean
  isSearchInput?: boolean
  deleteBtnText?: string
  navigationTitle?: string
  toggleSidebar?: () => void
  isAddNewAdminBtn?: boolean
  onReviewClick?: () => void
  onSuspendClick?: () => void
  title?: string | null | undefined
  isSuspendBtn?: 'Suspend' | 'Logout' | 'Unsuspend' | 'Create Ad' | 'Review Ad'

  //new work
  showButton1?: boolean
  showButton2?: boolean
  button1Text?: string
  button2Text?: string
  button1Type?: string
  button2Type?: string
  button1Icon?: any
  button2Icon?: any
  button1ClassName?: string
  button2ClassName?: string
  onButton1Click?: () => void
  onButton2Click?: () => void
  button1Variant?: 'contained' | 'outlined'
  button2Variant?: 'contained' | 'outlined'
  button1Size?: 'small' | 'large' | 'medium'
  button2Size?: 'small' | 'large' | 'medium'
}

export const Header = (props: HeaderProps) => {
  const {
    onDelete,
    title,
    isTabs,
    isSort,
    onGoBack,
    isFilter,
    isReviewBtn,
    isDeleteBtn,
    deleteBtnText,
    isNavigation,
    isLogoutBtn,
    isSuspendBtn,
    onReviewClick,
    isSearchInput,
    toggleSidebar,
    onSuspendClick,
    navigationTitle,
    isAddNewAdminBtn,

    //new work
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
            {isNavigation && (
              <NavigationBar
                onGoBack={onGoBack}
                navigationTitle={navigationTitle}
              />
            )}
            <Typography variant="h1" textAlign="left">
              {title}
            </Typography>
            <Box display="flex" gap={2}>
              {isSort && (
                <CustomFilterButton
                  onClick={() => dispatch(OPEN_SORT_MODAL())}
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
                <IconButton onClick={onButton1Click}>
                  {typeof button1Icon === 'string' ? (
                    <img src={button1Icon} alt="" />
                  ) : (
                    button1Icon
                  )}
                </IconButton>
              )}
              {showButton2 && (
                <IconButton onClick={onButton2Click}>
                  {typeof button2Icon === 'string' ? (
                    <img src={button2Icon} alt="" />
                  ) : (
                    button2Icon
                  )}
                </IconButton>
              )}
            </Box>
          </Box>
          {isTabs && (
            <Box width="100%" display="flex" justifyContent="center">
              <MuiCustomTab />
            </Box>
          )}
          {isSearchInput && (
            <Box width={'100%'} py={2}>
              <MuiCustomSearchInput />
            </Box>
          )}
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
            <Box display="flex" width="100%" justifyContent="center" gap={2}>
              {isSort && (
                <CustomFilterButton
                  onClick={() => dispatch(OPEN_SORT_MODAL())}
                />
              )}
              {isFilter && (
                <CustomFilterButton
                  placeholder="Filter"
                  icon="/assets/icons/filter_alt.svg"
                  onClick={() => dispatch(SET_FILTER_MODAL(true))}
                />
              )}
              {/* {isAddNewAdminBtn && (
                <MuiSmallButton
                  sx={{
                    borderRadius: 2,
                  }}
                  variant="contained"
                  btnText="Add New Admin"
                  onClick={() => dispatch(OPEN_ADMIN_MODAL())}
                />
                // <Button
                //   variant="contained"
                //   color="primary"
                //   onClick={() => dispatch(OPEN_ADMIN_MODAL())}
                // >
                //   Add New Admin
                // </Button>
              )} */}
              {isSearchInput && (
                <Box width={tabMode ? '100%' : '80%'}>
                  <MuiCustomSearchInput />
                </Box>
              )}
              {/* new */}
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

              {/* new end */}
              {/* {isSuspendBtn && (
                <MuiSmallButton
                  btnText={isSuspendBtn}
                  onClick={() =>
                    (onSuspendClick && onSuspendClick()) ||
                    dispatch(
                      isUserSuspened
                        ? SET_UNSUSPEND_USER(true)
                        : SET_SUSPEND_MODAL(true)
                    )
                  }
                />
              )}
              {isLogoutBtn && (
                <MuiSmallButton
                  btnText={isLogoutBtn}
                  onClick={() => dispatch(SET_LOGOUT_MODAL(true))}
                />
              )}
              {isDeleteBtn && (
                <Box ml={2}>
                  <MuiSmallButton
                    variant="outlined"
                    btnText={deleteBtnText || 'Delete'}
                    onClick={() =>
                      (onDelete && onDelete()) ||
                      dispatch(SET_DELETE_MODAL(true))
                    }
                  />
                </Box>
              )} */}
            </Box>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}

export default Header
