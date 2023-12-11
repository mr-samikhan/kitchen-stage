import { palette } from './palette'
import { COLORS } from '@muc/constant'
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
          // width: '205px',
          // height: '60px',
          fontWeight: 600,
          textTransform: 'capitalize',
          background: COLORS.secondary.light,
          '&.MuiButton-outlined': {
            background: 'transparent',
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
            width: 245,
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
        },
        indicator: {
          display: 'none',
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
