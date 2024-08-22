import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth.provider";
import { CircularProgress, Container } from "@mui/material";
export interface IProtectRouteContext {}

export interface IProtectRouteProvider {
  children: React.ReactNode;
  roles: string[];
}

export const ProtectRouteContext =
  React.createContext<IProtectRouteContext | null>(null);

export const ProtectRouteProvider: React.FC<IProtectRouteProvider> = (
  props
) => {
  const { auth, authLoading } = useContext<any>(AuthContext);

  if (authLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CircularProgress color="primary" size={80} />
      </Container>
    );
  }

  if (!auth) {
    return <Navigate to={"/login"} replace />;
  } else {
    return (
      <ProtectRouteContext.Provider value={{}}>
        {props.children}
      </ProtectRouteContext.Provider>
    );
  }
};
