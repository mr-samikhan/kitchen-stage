import { COLORS } from '@muc/constant'
import { Components } from '@mui/material'

export const MuiTextField: Components['MuiTextField'] = {
  defaultProps: {
    variant: 'outlined',
  },
  styleOverrides: {
    root: {
      '& input::placeholder': {
        color: COLORS.primary.main,
      },
      //default
      '& .MuiOutlinedInput-root': {
        fontSize: '16px',
        fontWeight: 500,
        borderRadius: '8px',
        background: COLORS.white,
        border: '1px solid #EDEDED',
        '&.Mui-focused': {
          color: COLORS.primary.main,
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      //auth
      '&.auth': {
        backgroundColor: 'transparent',
        '& .MuiOutlinedInput-root': {
          fontSize: '24px',
          fontWeight: 600,
          borderRadius: '20px',
          color: COLORS.info.main,
          background: COLORS.white,
          border: '1px solid #E5E5E5',
          '&.Mui-focused': {
            color: COLORS.info.main,
          },
          '&.Mui-error': {
            color: COLORS.error.main,
            borderColor: COLORS.error.main,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      },
    },
  },
}

export default MuiTextField
