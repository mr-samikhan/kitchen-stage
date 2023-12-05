import React from 'react'
import { COLORS } from '@muc/constant'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, IconButton } from '@mui/material'

interface SidebarProps {
  sideBarOptions?: any
}

export const Sidebar = (props: SidebarProps) => {
  const { sideBarOptions } = props || {}
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <Box
        p={3}
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <img src="assets/icons/logo.svg" alt="logo" width={72} height={72} />
        </Box>
        <Box display="flex" flexDirection="column" mb={12}>
          {sideBarOptions.map((item: any, index: number) => {
            return (
              <Box p={1}>
                <IconButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    zIndex: 10000,
                    position: 'relative',
                    width: '56px',
                    height: '56px',
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
          <IconButton>
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
