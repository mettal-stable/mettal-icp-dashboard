import { ProtectRouteProvider } from "@auth/interface/providers/protect.router.provider";
import { LoginScreen } from "@auth/interface/screens/login/login.screen";
import { SignupScreen } from "@auth/interface/screens/signup/signup.screen";
import { NotFoundRouteScreen } from "@dash/interface/screens/404/not-found-route.screen";

import { HomeScreen } from "@dash/interface/screens/home/home.screen";
import { Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route
        path="/"
        element={
          <ProtectRouteProvider roles={["USER"]}>
            <HomeScreen />
          </ProtectRouteProvider>
        }
      />
      <Route path="*" element={<NotFoundRouteScreen />} />
    </Routes>
  );
};
