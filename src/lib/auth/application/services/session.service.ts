import { Auth } from "@auth/domain/models/auth.model";
import { ServiceException } from "@shared/application/exceptions/service.exception";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export class SessionService {
  auth?: Auth;
  expireThreshold: number = 30;
  expirationDate: any;
  async execute(auth: Auth): Promise<Auth> {
    this.auth = auth;
    try {
      this.register(auth);
      return auth;
    } catch (error) {
      throw new ServiceException("Unauthorized");
    }
  }

  getCookieExpirationDate() {
    return this.expirationDate;
  }
  setThreshold(value: number) {
    this.expireThreshold = value;
  }

  isValidToken(token: string) {
    const current_time = new Date();
    const decodeToken: any = jwtDecode(token);
    if (decodeToken) {
      if (current_time.getTime() > decodeToken.exp * 1000) {
        return false;
      }
      return true;
    }
    return false;
  }

  async getToken() {
    return this.getTokenFromCookie();
  }
  getTokenFromStore() {
    let data: any = localStorage.getItem("auth_data");
    let auth: Auth = Auth.of(JSON.parse(data));
    return auth.token || null;
  }

  getAuthFromCookie(): Auth | null {
    let data = Cookies.get("auth_data");
    if (data) {
      let auth: Auth = Auth.of(JSON.parse(data));
      if (auth?.token) {
        return auth;
      }
    }
    return null;
  }

  getTokenFromCookie() {
    let data = Cookies.get("auth_data");
    if (data) {
      let auth: Auth = Auth.of(JSON.parse(data));
      return auth.token;
    }
    return null;
  }
  registerToken(auth: Auth) {
    if (auth.token) {
      localStorage.setItem("token", auth.token);
    }
  }

  register(auth: Auth) {
    this.auth = auth;
    let nauth: any = Auth.of(auth);
    const data = JSON.stringify(nauth);
    const expirationTime = this.expireThreshold * 60 * 1000;
    this.expirationDate = new Date(new Date().getTime() + expirationTime);

    localStorage.removeItem("auth_data");
    localStorage.setItem("auth_data", data);
    Cookies.set("auth_data", data, { expires: this.expirationDate });
  }

  removeStored() {
    localStorage.removeItem("auth_data");
    Cookies.remove("auth_data");
  }

  async signout() {}
}
