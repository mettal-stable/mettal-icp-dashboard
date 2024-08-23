import { Auth } from "../models/auth.model";

export interface IAuthPort {
  authClient?: any;
  init(): Promise<void>;
  setClient(client?: any): Promise<any>;
  getMetalToken(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
  geAuth(): Promise<Auth>;
  login(input?: any): Promise<any>;
  logout(): Promise<void>;
  signup(input?: any): Promise<any>;
}
