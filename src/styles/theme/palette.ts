import { COLORS } from '@cookup/constant'
import { PaletteOptions } from '@mui/material/styles'

export const palette: PaletteOptions = {
  background: {
    default: COLORS.background,
  },
  primary: {
    main: COLORS.primary.main,
    light: COLORS.primary.light,
  },
  secondary: {
    main: COLORS.secondary.main,
    light: COLORS.secondary.light,
  },
  info: {
    main: COLORS.info.main,
    light: COLORS.info.light,
  },
  grey: {
    50: '#8A8887',
    100: '#85848B',
    200: '#F6F6F6',
    300: '#808080',
    400: '#9D9DAA',
    500: '#E5E5E5',
  },
  error: {
    main: COLORS.error.main,
  },
  dark: {
    main: '#000000',
  },
  success: {
    main: COLORS.success,
  },
}

export default palette
