import React from 'react'
import { useSelector } from 'react-redux'
import { getInitials } from '@cookup/helpers'
import { useBreakPoints } from '@cookup/hooks'
import CloseIcon from '@mui/icons-material/Close'
import { COLORS, ROUTES } from '@cookup/constant'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Box, IconButton, Typography } from '@mui/material'

interface SidebarProps {
  sideBarOptions?: any
  toggleSidebar?: () => void
}

export const Sidebar = (props: SidebarProps) => {
  const { sideBarOptions, toggleSidebar } = props || {}

  const { pathname } = useLocation()

  const navigate = useNavigate()
  const { mobileMode } = useBreakPoints()

  const { user } = useSelector((state: any) => state.auth)

  return (
    <React.Fragment>
      {mobileMode && (
        <Box position="absolute" right={0} onClick={toggleSidebar}>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <Box
        p={1}
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box my={1}>
          <img
            src="/assets/icons/kitchen-stage.svg"
            alt="logo"
            width={72}
            height={72}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          mb={5}
          justifyContent="space-between"
          alignItems="center"
        >
          {sideBarOptions.map((item: any, index: number) => {
            return (
              <Box p={1} mt={1} textAlign="center">
                <IconButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    zIndex: 10000,
                    width: '56px',
                    height: '56px',
                    borderRadius: 2,
                    position: 'relative',
                    bgcolor: 'transparent',
                    // bgcolor: item.active ? 'secondary.light' : 'trasparent',
                  }}
                >
                  <img
                    alt="logo"
                    key={index}
                    src={item.active ? item.activeIcon : item.icon}
                    style={{
                      width: 21,
                      height: 21,
                      top: item.active && '50%',
                      left: item.active && '50%',
                      zIndex: item.active && 10000,
                      position: item.active && 'absolute',
                      transform: item.active && 'translate(-50%, -50%)',
                    }}
                  />
                </IconButton>
                <Typography
                  mt={1}
                  fontSize={10}
                  fontWeight={600}
                  textAlign="center"
                  color={COLORS.grey.main}
                >
                  {item?.label}
                </Typography>
              </Box>
            )
          })}
        </Box>
        <Box>
          <IconButton onClick={() => navigate(ROUTES.SETTINGS)}>
            <Avatar
              sx={{
                bgcolor:
                  pathname === ROUTES.SETTINGS
                    ? COLORS.secondary.light
                    : COLORS.wine.main,
                fontWeight: 700,
              }}
            >
              {getInitials(user?.userName || '')}
            </Avatar>
          </IconButton>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Sidebar
