import { SessionService } from "@auth/application/services/session.service";
import { MettalAuthAdapter } from "@auth/data/mettal.auth.adapter";
import { Auth } from "@auth/domain/models/auth.model";
import { IAuthPort } from "@auth/domain/ports/auth.port";
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
  provider: IAuthPort;
  adapter: MettalAuthAdapter;
  session: SessionService;
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

  const initProvider = async () => {
    await props.provider.init();
    setProviderClient(props.provider.authClient);
  };

  const geAuth = async (): Promise<boolean> => {
    setLoadingAuth(true);
    let isAuth = await props.provider.isAuthenticated();

    if (isAuth) {
      const auth = await getAuth();
      const account = await getAccount();

      if (auth) {
        props.session.register(auth);

        if (!account) {
          await props.provider.logout();
          useErrorAlert!({ message: "Account not found" });
          return true;
        }
        navigate("/");
        setTimeout(() => {
          setLoadingAuth(false);
        }, 300);
        return true;
      } else {
        setLoadingAuth(false);
        return false;
      }
    } else {
      setLoadingAuth(false);
      return false;
    }
  };

  const login = async (input?: any) => {
    try {
      await props.provider.login(input);
      await geAuth();
    } catch (error: any) {
      useErrorAlert!(error);
      console.error(error);
    }
  };

  const linkIcp = async (input?: any) => {
    try {
      await props.provider.login();
      let identity = props.provider.getIdentity();
      await props.adapter.linkIcp({
        access_token: accessTmpToken?.access_token,
        email: input?.email,
        principal: identity?.getPrincipal().toString(),
      });

      await geAuth();
    } catch (error: any) {
      useErrorAlert!(error);
      console.error(error);
    }
  };

  const validateOtp = async (input: any) => {
    try {
      let response = await props.adapter.validateOtp(input);
      console.log(response);
      setAccessTmpToken(response);
      return response;
    } catch (error: any) {
      useErrorAlert!(error);
      console.error(error);
    }
  };

  const logout = async () => {
    await props.provider.logout();
    await props.session.signout();
    await props.provider.logout();
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

  const getAuth = async () => {
    try {
      const auth = await props.provider.geAuth();
      setAuth(auth);
      return auth;
    } catch (error) {
      console.log(error);
      return null;
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
    initProvider();
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
