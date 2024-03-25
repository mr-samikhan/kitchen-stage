import React from 'react'
import { Box } from '@mui/material'

interface CustomTooltipProps {}

const CustomTooltip = (props: CustomTooltipProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)
  return (
    <React.Fragment>
      <Box
        top={-10}
        height={90}
        right={-100}
        zIndex={10000}
        position="absolute"
      >
        <Box borderRadius={2} bgcolor="background.paper" width={126}>
          {['Edit', 'Delete'].map((item, index) => (
            <Box
              py={1}
              key={index}
              textAlign="center"
              onClick={() => setSelectedIndex(index)}
              bgcolor={index === selectedIndex ? '#D9D9D9' : 'transparent'}
            >
              {item}
            </Box>
          ))}
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default CustomTooltip
