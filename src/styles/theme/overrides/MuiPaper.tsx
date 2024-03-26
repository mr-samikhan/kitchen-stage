import { Components } from '@mui/material'

export const MuiPaper: Components['MuiPaper'] = {
  styleOverrides: {
    root: ({ theme }: { theme: any }) => ({
      '&.dashboard_card': {
        padding: 10,
        borderRadius: 10,
        // backgroundColor: '#F0F0F0',
      },
      '&.songs-modal': {
        width: 400,
        top: '50%',
        left: '50%',
        padding: 20,
        display: 'flex',
        borderRadius: 10,
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'column',
        transform: 'translate(-50%, -50%)',
        [theme.breakpoints.down('md')]: {
          width: '90%',
        },
      },
    }),
  },
}

export default MuiPaper
