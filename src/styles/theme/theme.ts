import { palette } from './palette'
import { COLORS } from '@cookup/constant'
import { typography } from './typography'
import { BoxProps } from '@mui/material/Box'
import { MuiPaper } from './overrides/MuiPaper'
import { MuiTextField } from './overrides/MuiTextField'
import createTheme from '@mui/material/styles/createTheme'
import { responsiveFontSizes } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {}
  interface Palette {
    dark: {
      main: React.CSSProperties['color']
    }
  }
  interface PaletteOptions {
    dark?: {
      main?: React.CSSProperties['color']
    }
  }
}

declare module '@mui/material/Button' {
  interface ButtonOwnProps {
    light?: boolean
  }
}
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    dark: true
  }
}
declare module '@mui/material/Chip' {
  interface ChipOwnProps {
    light?: boolean
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    xs?: true
  }
}
declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    xs?: true
  }
}

declare module '@mui/material/Grid' {
  interface GridOwnProps {
    vCenter?: boolean
    fullHeight?: boolean
  }
}

declare module '@mui/material/Paper' {
  interface PaperOwnProps extends BoxProps {}
}

let theme = createTheme({
  palette,
  typography,
  components: {
    MuiTextField,
    MuiPaper,
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          fontWeight: 500,
          color: '#808080',
          fontSize: '0.9375rem',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(2px)',
          background: 'rgba(49, 49, 55, .7)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 16,
          fontWeight: 600,
          borderRadius: '8px',
          textTransform: 'capitalize',
          padding: '15px 20px 15px 20px',
          background: COLORS.secondary.light,
          '&.MuiButton-outlined': {
            background: 'transparent',
          },
          '&.custom': {
            borderRadius: '12px',
          },
        },
        sizeSmall: {
          fontSize: 16,
          borderRadius: '38px',
          padding: '15px 20px 15px 20px',
          '&.MuiButton-outlinedSizeSmall': {
            border: `1.3px solid ${COLORS.secondary.light}`,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '&.custom-tab': {
            width: 230,
            // width: 245,
            borderRadius: '57px',
            background: COLORS.white,
            color: COLORS.primary.main,
            '& .Mui-selected': {
              margin: 5,
              height: 55,
              width: 128,
              fontSize: 16,
              fontWeight: 600,
              borderRadius: '50px',
              color: COLORS.white,
              background: COLORS.secondary.light,
            },
          },
          '&.custom-tabs': {
            borderRadius: '57px',
            background: COLORS.white,
            color: COLORS.primary.main,
            '& .Mui-selected': {
              margin: 5,
              height: 55,
              fontSize: 16,
              fontWeight: 600,
              borderRadius: '50px',
              color: COLORS.white,
              background: COLORS.secondary.light,
            },
          },
          '&.support-tabs': {
            padding: 5,
            width: '540px',
            borderRadius: '57px',
            color: COLORS.primary.main,
            background: COLORS.grey.dark,
            '& .Mui-selected': {
              margin: 5,
              height: 55,
              fontSize: 16,
              fontWeight: 600,
              borderRadius: '50px',
              color: COLORS.white,
              background: COLORS.secondary.light,
            },
          },
        },
        indicator: {
          display: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          '&.selected': {
            width: '64px',
            color: 'white',
            background: COLORS.secondary.light,
          },
          '&.custom-chip': {
            color: COLORS.primary.main,
            background: 'transparent',
            border: `1.3px solid ${COLORS.primary.main}`,
          },
        },
      },
    },
    MuiPopper: {
      styleOverrides: {
        root: {
          width: '100vw',
          display: 'flex',
          alignSelf: 'center',
          position: 'absolute',
          justifyContent: 'center',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& thead th': {
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.primary.main,
            backgroundColor: COLORS.grey.dark,
          },

          '& tbody td': {
            fontSize: 14,
            fontWeight: 500,
            color: COLORS.primary.main,
            border: 'none',
          },

          '& tbody tr td:first-child': {
            borderRight: `1px solid #CDCDCD`,
          },
          '& tbody tr td:nth-child(2)': {
            borderRight: `1px solid #CDCDCD`,
          },

          //align end for last column
          '& tbody tr td:last-child': {
            textAlign: 'end',
            paddingRight: 20,
          },

          '& tbody tr:nth-of-type(odd)': {
            backgroundColor: COLORS.row,
          },
          '& .MuiTableCell-root': {
            padding: '5px 5px',
          },
          '& .no-records-found': {
            //center the text in td
            textAlign: 'center !important',
            padding: '20px 0',
          },
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
