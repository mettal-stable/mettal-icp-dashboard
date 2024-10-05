import { ICPProvider } from "@auth/data/icp.provider.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouter } from "@shared/interface/router/router.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./assets/app.scss";
import AuthProvider from "./lib/auth/interface/providers/auth.provider.tsx";
import theme from "./lib/shared/interface/themes/theme.default.ts";

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
