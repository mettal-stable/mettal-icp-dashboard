import { Identity } from "@dfinity/agent";
import { Auth } from "../models/auth.model";

export interface IAuthPort {
  [x: string]: any;
  authClient?: any;
  init(): Promise<void>;
  setClient(client?: any): Promise<any>;
  isAuthenticated(): Promise<boolean>;
  geAuth(): Promise<Auth>;
  login(input?: any): Promise<any>;
  logout(): Promise<void>;
  signup(input?: any): Promise<any>;
  getIdentity(): Identity | undefined;
}
