import { MettalAuthAdapter } from "@auth/data/mettal.auth.adapter";
import { Auth } from "@auth/domain/models/auth.model";
import { NotificationContext } from "@shared/providers/notification.provider";
import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export type SignupInput = {
  name: string;
  last_name: string;
  email: string;
};

export type IAuthContext = {
  login(): void;
  logout(): void;
  linkIcp(input?: any): Promise<any>;
  signup(input: SignupInput): Promise<any>;
  validateOtp(input: any): Promise<any>;
  auth: Auth | null;
  authLoading: boolean;
  account: any;
  getAccount(): Promise<any>;
};

export interface IAuthProvider {
  children: React.ReactNode;
  adapter: MettalAuthAdapter;
}

export type AccessTmpToken = {
  access_token: string;
  refresh_token: string;
  expires_at: string;
  expires_in: string;
  token_type: string;
};
export const SignupSteps = ["signupForm", "create-icp-account", ""];

export const AuthContext = React.createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<IAuthProvider> = (props) => {
  let navigate = useNavigate();
  const { useErrorAlert } = useContext(NotificationContext);
  const [accessTmpToken, setAccessTmpToken] = useState<AccessTmpToken>();
  const [authLoading, setLoadingAuth] = useState<boolean>(true);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [providerClient, setProviderClient] = useState<any>(null);
  const [account, setAccount] = useState<any>(null);

  const init = async () => {
    await props.adapter.init();
    setProviderClient(await props.adapter.getAuthClient());
  };

  const geAuth = async (): Promise<boolean> => {
    let isAuth = await props.adapter.isAuthenticated();
    setLoadingAuth(true);
    if (isAuth) {
      const auth = await props.adapter.getAuth();

      if (auth) {
        await props.adapter.registerSession(auth);
        setAuth(auth);
        navigate("/");
        const account = await getAccount();
        if (!account) {
          await props.adapter.logout();
          setLoadingAuth(false);
          setAuth(null);
          useErrorAlert!({ message: "Account not found" });
          return true;
        }
        setLoadingAuth(false);
        return true;
      } else {
        console.log("no auth value");
        setLoadingAuth(false);
        return false;
      }
    } else {
      console.log("no isAuth");
      setLoadingAuth(false);
      return false;
    }
  };

  const login = async (input?: any) => {
    try {
      await props.adapter.login(input);
      await geAuth();
    } catch (error: any) {
      useErrorAlert!(error);
    }
  };

  const linkIcp = async (input?: any) => {
    try {
      await props.adapter.linkIcp({
        access_token: accessTmpToken?.access_token,
        email: input?.email,
      });

      geAuth();
    } catch (error: any) {
      useErrorAlert!(error);
      console.error(error);
    }
  };

  const validateOtp = async (input: any) => {
    try {
      let response = await props.adapter.validateOtp(input);
      setAccessTmpToken(response);
      return response;
    } catch (error: any) {
      useErrorAlert!(error);
      console.error(error);
    }
  };

  const logout = async () => {
    await props.adapter.logout();
    setAuth(null);
  };

  const signup = async (input: SignupInput) => {
    try {
      let response = await props.adapter.signup(input);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getAccount = async () => {
    try {
      const account = await props.adapter.getAccount();
      setAccount(account);
      return account;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  React.useEffect(() => {
    if (!!providerClient) {
      geAuth();
    }
  }, [providerClient]);

  React.useEffect(() => {
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        linkIcp,
        signup,
        auth,
        authLoading,
        validateOtp,
        account,
        getAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
