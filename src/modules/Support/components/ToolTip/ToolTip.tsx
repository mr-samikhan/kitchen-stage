import React from 'react'
import { COLORS } from '@cookup/constant'
import { useDispatch } from 'react-redux'
import { SET_TOOL_TIP } from '@cookup/redux'
import { Box, Typography } from '@mui/material'

interface IToolTips {
  id?: string
  selectedIndex: number | null
  setSelectedIndex: (index: number | null) => void
}

export const ToolTip = (props: IToolTips) => {
  const { setSelectedIndex, id, selectedIndex } = props || {}

  const dispatch = useDispatch()

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (selectedIndex !== null) {
        const tooltip = document.getElementById('tooltip')
        if (tooltip && !tooltip.contains(event.target as Node)) {
          setSelectedIndex(null)
        }
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [selectedIndex])

  return (
    <React.Fragment>
      <Box
        id={id}
        gap={2}
        right={0}
        zIndex={1}
        width={180}
        height={90}
        display="flex"
        position="absolute"
        borderRadius="8px"
        alignContent="center"
        flexDirection="column"
        justifyContent="center"
        bgcolor={COLORS.secondary.light}
      >
        {['Suspended User', 'Resolved Report'].map((item) => (
          <Typography
            key={item}
            width={140}
            height={24}
            variant="h6"
            color="white"
            textAlign="center"
            fontFamily="Poppins"
            onClick={() => {
              dispatch(
                SET_TOOL_TIP({
                  isToolTipModal: true,
                  isToolTip: item,
                })
              )
              setSelectedIndex && setSelectedIndex(null)
            }}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: COLORS.primary.main,
              },
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </React.Fragment>
  )
}

export default ToolTip
