import { GetAccountService } from "@dash/data/services/get-account.service";
import { LinkIcpAuthService } from "./mettal/link-icp-auth.service";
import { SignupService } from "./mettal/signup.service";
import { ValidateOtpService } from "./mettal/validate-otp.service";
import { SessionService } from "@auth/application/services/session.service";
import { ICPProvider } from "./icp.provider";

export class MettalAuthAdapter {
  session: SessionService;
  provider: ICPProvider;
  constructor(session: SessionService, provider: ICPProvider) {
    this.session = session;
    this.provider = provider;
  }

  async init() {
    await this.provider.init();
  }

  async getAuthClient() {
    return this.provider.authClient;
  }

  async signup(input: any) {
    const service = new SignupService();
    return await service.execute(input);
  }

  async validateOtp(input: any) {
    const service = new ValidateOtpService();
    return await service.execute(input);
  }

  async linkIcp(input: any) {
    const service = new LinkIcpAuthService();
    return await service.execute(input);
  }

  async getAccount() {
    const service = new GetAccountService();
    return await service.execute();
  }
  async registerSession(auth: any) {
    return this.session.register(auth);
  }
  async isAuthenticated() {
    return await this.provider.isAuthenticated();
  }

  async getAuth() {
    return await this.provider.geAuth();
  }

  async login(_: any) {
    await this.provider.login();
  }

  async logout() {
    await this.session.signout();
    await this.provider.logout();
  }
  async getToken() {
    return await this.session.getToken();
  }
}
