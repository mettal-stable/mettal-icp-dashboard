import { GetAccountService } from "@dash/data/services/get-account.service";
import { LinkIcpAuthService } from "./mettal/link-icp-auth.service";
import { SignupService } from "./mettal/signup.service";
import { ValidateOtpService } from "./mettal/validate-otp.service";

export class MettalAuthAdapter {
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
}
