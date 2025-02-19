import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Readex Pro", "sans-serif"].join(","),
    fontWeightMedium: 600,
    fontWeightRegular: 500,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#2D2C54",
    },
    secondary: {
      main: "#43439a",
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: "#fff",
      default: "#f5f0ed",
      secondary: "#efeeff ",
    },

    bgGradient: {
      default:
        "linear-gradient(130deg, rgba(78,78,148,1) 0%, rgba(45,44,84,1) 100%)",
    },
  },
});

export default theme;
