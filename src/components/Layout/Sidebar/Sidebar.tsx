import React from 'react'
import { useBreakpints } from '@cookup/hooks'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import { COLORS, ROUTES } from '@cookup/constant'
import { Avatar, Box, IconButton } from '@mui/material'

interface SidebarProps {
  sideBarOptions?: any
  toggleSidebar?: () => void
}

export const Sidebar = (props: SidebarProps) => {
  const { sideBarOptions, toggleSidebar } = props || {}

  const navigate = useNavigate()
  const { mobileMode } = useBreakpints()

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
        p={3}
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <img src="/assets/icons/logo.svg" alt="logo" width={72} height={72} />
        </Box>
        <Box display="flex" flexDirection="column" mb={12}>
          {sideBarOptions.map((item: any, index: number) => {
            return (
              <Box p={1}>
                <IconButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    zIndex: 10000,
                    width: '56px',
                    height: '56px',
                    borderRadius: 2,
                    position: 'relative',
                    bgcolor: item.active ? 'secondary.light' : 'trasparent',
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
              </Box>
            )
          })}
        </Box>
        <Box>
          <IconButton onClick={() => navigate(ROUTES.SETTINGS)}>
            <Avatar sx={{ bgcolor: COLORS.wine.main, fontWeight: 700 }}>
              SK
            </Avatar>
          </IconButton>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Sidebar
