import { Routes } from '@cookup/core'
import { CssBaseline } from '@mui/material'
import { ReduxProvider, ThemeProvider } from '@cookup/providers'

const App = () => {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App
