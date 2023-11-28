import { PaletteOptions, alpha } from '@mui/material/styles'

export const palette: PaletteOptions = {
  primary: {
    main: '#8ADFEC',
    contrastText: '#000000',
    light: alpha('#8ADFEC', 0.2),
  },
  secondary: {
    main: '#FAA195',
    light: alpha('#FAA195', 0.2),
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
  },
  dark: {
    main: '#000000',
  },
}

export default palette
