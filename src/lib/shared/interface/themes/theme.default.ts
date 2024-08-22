import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#2D2C54",
    },
    secondary: {
      main: "#474787",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f5f0ed",
    },
  },
});

export default theme;
