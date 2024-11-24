import { IcpCanisterAdapter } from "../icp/icp-canister.adapter";
import { KycCompletedRewardService } from "./services/kyc-completed-reward.service";
import { SellIcpTokensServiceProvider } from "./services/sell-icp-tokens.service.provider";

export class TransactionAdapter {
  async sellIcpToken(input: any) {
    const service = new SellIcpTokensServiceProvider();
    return await service.execute(input);
  }

  async approveIcpTransfer(input: any) {
    const adapter = new IcpCanisterAdapter();
    return await adapter.approveTransfer(input);
  }

  async kycCompletedReward(input?: any) {
    const service = new KycCompletedRewardService();
    return await service.execute(input);
  }
}
