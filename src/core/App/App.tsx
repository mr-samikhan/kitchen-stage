import { Routes } from "@muc/core";
import { CssBaseline } from "@mui/material";
import {ThemeProvider} from "@muc/providers"

const App = () => {

  return (
    <ThemeProvider>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
