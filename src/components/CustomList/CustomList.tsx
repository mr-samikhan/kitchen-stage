import React, { useState } from 'react'
import { COLORS } from '@cookup/constant'
import { ToolTip } from '@cookup/modules'
import { useBreakPoints } from '@cookup/hooks'
import { ChevronRight } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { OPEN_EDIT_ADMIN_MODAL, SET_SINGLE_SUPPORT_DATA } from '@cookup/redux'
import {
  Box,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material'

interface CustomListProps {
  data?: any
  icon?: string
  height?: number
  showKeys?: string[]
  isLoading?: boolean
  headerData?: string[]
  isViewMessage?: boolean
  isActionButton?: boolean
  isActionButtons?: boolean
  isBgColor?: string | undefined
  onDelete?: (name: string) => void
  onSelectUser?: (user: any) => void
  onNavigation?: (item: any) => void
  iconPosition?: 'flex-start' | 'flex-end' | 'center'
}

const CustomList: React.FC<CustomListProps> = (props) => {
  const {
    data,
    icon,
    height,
    onDelete,
    showKeys,
    isBgColor,
    isLoading,
    headerData,
    onSelectUser,
    onNavigation,
    isViewMessage,
    iconPosition,
    isActionButton,
    isActionButtons,
  } = props || {}

  const dispatch = useDispatch()
  const { mobileMode } = useBreakPoints()

  const { singleSupportData } = useSelector((state: any) => state.support)

  const [isMessage, setIsMessage] = useState<boolean>(false)
  const [isToolTip, setIsToolTip] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

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
        {!isLoading && data?.length === 0 && (
          <Grid container justifyContent="center" mt={2}>
            <Typography variant="h5" color={COLORS.grey.main}>
              No Data Found
            </Typography>
          </Grid>
        )}
        {!isLoading &&
          data?.map((user: any, index: number) => {
            let keys = showKeys || [
              'id',
              'uid',
              'gender',
              // 'dateOfBirth',
              'experience',
            ]
            const filteredKeys = Object.keys(user).filter((key) =>
              keys.includes(key)
            )
            return (
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
                  {filteredKeys?.map((key) => (
                    <Grid item xs={3} key={key}>
                      <Typography
                        color="secondary"
                        variant={mobileMode ? 'body1' : 'subtitle1'}
                      >
                        {user[key]}
                      </Typography>
                    </Grid>
                  ))}
                  <Grid item xs={3}>
                    <Box
                      display="flex"
                      position="relative"
                      justifyContent={
                        isActionButton
                          ? iconPosition || 'flex-start'
                          : iconPosition || 'flex-end'
                      }
                    >
                      {isActionButtons && (
                        <>
                          <IconButton
                            onClick={() => {
                              onSelectUser && onSelectUser(user)
                              dispatch(OPEN_EDIT_ADMIN_MODAL())
                            }}
                          >
                            <img src="/assets/icons/edit-icon.svg" alt="edit" />
                          </IconButton>
                          <IconButton
                            onClick={() => onDelete && onDelete(user)}
                          >
                            <img
                              src="/assets/icons/delete-icon.svg"
                              alt="delete"
                            />
                          </IconButton>
                        </>
                      )}
                      {isViewMessage && (
                        <Grid
                          item
                          gap={1}
                          xs={12}
                          display="flex"
                          alignItems="center"
                        >
                          {singleSupportData &&
                            isMessage &&
                            index === selectedIndex && (
                              <img src="/assets/icons/dot.svg" alt="dot" />
                            )}
                          <Typography
                            onClick={() => {
                              dispatch(
                                SET_SINGLE_SUPPORT_DATA({
                                  user,
                                  isViewMessage: true,
                                })
                              )
                              setIsMessage(true)
                              setSelectedIndex(index)
                              setIsToolTip(false)
                            }}
                            color="secondary"
                            variant={mobileMode ? 'body1' : 'subtitle1'}
                            sx={{
                              cursor: 'pointer',
                            }}
                          >
                            View Message
                          </Typography>
                        </Grid>
                      )}
                      {isActionButton && (
                        <IconButton
                          onClick={() => {
                            setIsToolTip(true)
                            onNavigation && onNavigation(user)
                            setSelectedIndex(index)
                            setIsMessage(false)
                          }}
                        >
                          {icon ? (
                            <img src={icon} alt="" />
                          ) : (
                            <ChevronRight color="error" />
                          )}
                        </IconButton>
                      )}
                      {isToolTip && index == selectedIndex && (
                        <ToolTip
                          id="tooltip"
                          selectedIndex={selectedIndex}
                          setSelectedIndex={setSelectedIndex}
                        />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </React.Fragment>
            )
          })}
        {isLoading && (
          <Grid container justifyContent="center" mt={2}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default CustomList
