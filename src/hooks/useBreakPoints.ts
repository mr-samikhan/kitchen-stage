import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const useBreakPoints = () => {
  const theme = useTheme()
  const mobileMode = useMediaQuery(theme.breakpoints.between(0, 600))
  const tabMode = useMediaQuery(theme.breakpoints.between(600, 900))
  const desktopMode = useMediaQuery(theme.breakpoints.up(900))

  return {
    mobileMode,
    tabMode,
    desktopMode,
  }
}
export default useBreakPoints
