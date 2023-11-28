import { ReactNode } from "react";
import { theme } from "@muc/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

export default ThemeProvider;
