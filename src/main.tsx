import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import theme from "./lib/shared/interface/themes/theme.default.ts";
import { CssBaseline } from "@mui/material";
import AuthProvider from "./lib/auth/interface/providers/auth.provider.tsx";
import { AppRouter } from "@shared/interface/router/router.tsx";
import "./assets/app.scss";
import { ICPProvider } from "@auth/data/icp.provider.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider provider={new ICPProvider()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
