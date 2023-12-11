import { Components } from '@mui/material'

export const MuiPaper: Components['MuiPaper'] = {
  styleOverrides: {
    root: {
      '&.dashboard_card': {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
      },
    },
  },
}

export default MuiPaper
