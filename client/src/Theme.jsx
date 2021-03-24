import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";

function Theme({ children }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: { main: "#E49012" },
      background: { default: darkMode ? "#303030" : "#F0F2F5" }
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
