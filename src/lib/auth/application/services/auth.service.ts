import { Auth } from "@auth/domain/models/auth.model";
import { IAuthPort } from "@auth/domain/ports/auth.port";

export interface InputAuthService {
  provider: IAuthPort;
  method: any;
}
export class AuthService {
  method: any;
  auth?: Auth;
  input?: InputAuthService;
  provider?: IAuthPort;
  constructor(input?: InputAuthService) {
    this.setProvider(input?.provider);
  }

  setProvider(provider?: IAuthPort) {
    this.provider = provider;
  }
  async login() {}
  async logout() {}
  async signup() {}
  async getAuth() {}
}
