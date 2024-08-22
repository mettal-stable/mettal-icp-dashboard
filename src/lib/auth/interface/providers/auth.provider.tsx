import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import { Auth } from "@auth/domain/models/auth.model";
import { IAuthPort } from "@auth/domain/ports/auth.port";

export type IAuthContext = {
  login(): void;
  logout(): void;
  signup(e: React.SyntheticEvent): void;
  auth: Auth | null;
  authLoading: boolean;
};

export interface IAuthProvider {
  children: React.ReactNode;
  provider: IAuthPort;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<IAuthProvider> = (props) => {
  let navigate = useNavigate();

  const [authLoading, setLoadingAuth] = useState<boolean>(true);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [providerClient, setProviderClient] = useState<any>(null);

  const initProvider = async () => {
    await props.provider.init();
    setProviderClient(props.provider.authClient);
  };

  const geAuth = async (): Promise<boolean> => {
    setLoadingAuth(true);
    let auth = await props.provider.isAuthenticated();
    if (auth) {
      const idty = await props.provider.geAuth();
      setAuth(idty);
      navigate("/");
      setTimeout(() => {
        setLoadingAuth(false);
      }, 300);
      return true;
    } else {
      setLoadingAuth(false);
      return false;
    }
  };

  const login = async (input?: any) => {
    try {
      await props.provider.login(input);
      await geAuth();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await props.provider.logout();
    setAuth(null);
  };

  const signup = async (_?: any) => {};

  React.useEffect(() => {
    if (!!providerClient) {
      geAuth();
    }
  }, [providerClient]);

  React.useEffect(() => {
    initProvider();
  }, []);

  // console.log({ auth: auth, authLoading });

  return (
    <AuthContext.Provider value={{ login, logout, signup, auth, authLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
