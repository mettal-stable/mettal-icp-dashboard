import { ICPProvider } from "@auth/data/icp.provider.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouter } from "@shared/interface/router/router.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./assets/app.scss";
import AuthProvider from "./lib/auth/interface/providers/auth.provider.tsx";
import theme from "./lib/shared/interface/themes/theme.default.ts";
import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "@shared/infra/graphql/apollo.tsx";
import { SessionService } from "@auth/application/services/session.service.ts";
import { MettalAuthAdapter } from "@auth/data/mettal.auth.adapter.ts";
import { SnackbarProvider } from "notistack";
import { NotificationProvider } from "@shared/providers/notification.provider.tsx";
import { SocketProvider } from "@shared/providers/socket-provider.tsx";

if (typeof global === "undefined") {
  window.global = window;
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
        <NotificationProvider>
          <AuthProvider
            provider={new ICPProvider()}
            session={new SessionService()}
            adapter={new MettalAuthAdapter()}
          >
            <SocketProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppRouter />
              </ThemeProvider>
            </SocketProvider>
          </AuthProvider>
        </NotificationProvider>
      </SnackbarProvider>
    </ApolloProvider>
  </BrowserRouter>
);
