import { COLORS } from '@cookup/constant'
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
        '&.Mui-error': {
          color: COLORS.error.main,
          borderColor: COLORS.error.main,
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
      //filter
      '&.filter': {
        '& .MuiOutlinedInput-root': {
          width: '132px',
          fontSize: '16px',
          fontWeight: 500,
          borderRadius: '38px',
          background: COLORS.white,
          border: '1px solid #EDEDED',
          '&.Mui-focused': {
            color: COLORS.primary.main,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${COLORS.primary.main}`,
        },
      },
      '&.filter-filled': {
        '& .MuiOutlinedInput-root': {
          fontSize: '16px',
          fontWeight: 500,
          borderRadius: '38px',
          background: COLORS.white,
          border: '1px solid #EDEDED',
          '&.Mui-focused': {
            color: COLORS.primary.main,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${COLORS.primary.main}`,
        },
      },
      //start & end_date
      '&.start-end-date': {
        '& .MuiOutlinedInput-root': {
          height: 58,
          fontWeight: 500,
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #EDEDED',
          background: COLORS.grey.dark,
          '&.Mui-focused': {
            color: COLORS.primary.main,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      },
      '&.settings-input': {
        '& .MuiOutlinedInput-root': {
          fontSize: '16px',
          fontWeight: 600,
          borderRadius: '8px',
          fontFamily: 'Poppins',
          // background: '#F6F6F6',
          border: '1px solid #EDEDED',
          '&.Mui-focused': {
            color: COLORS.primary.main,
          },
          '&.Mui-error': {
            color: COLORS.error.main,
            borderColor: COLORS.error.main,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: '1px solid #BEBEBE',
        },
      },
      '&.grey-background': {
        '& .MuiOutlinedInput-root': {
          background: COLORS.grey.dark,
          color: COLORS.input.main,
        },
      },
      '&.music-input': {
        '& .MuiOutlinedInput-root': {
          background: '#EBEBEB',
          border: '1px solid #C5C5C5',
        },
      },
    },
  },
}

export default MuiTextField
