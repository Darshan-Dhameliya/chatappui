import React from "react";
import Homepage from "./Homepage";
import "./App.css";
import { createTheme, ThemeProvider } from "@material-ui/core";

const themeData = createTheme({
  palette: {
    primary: {
      main: "#0d6efd",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={themeData}>
      <Homepage />
    </ThemeProvider>
  );
}
