import { KycCompletedRewardService } from "./services/kyc-completed-reward.service";
import { SellTokensService } from "./services/sell-tokens.service";

export class TransactionAdapter {
  async sellCrypto(input: any) {
    const service = new SellTokensService();
    return await service.execute(input);
  }

  async kycCompletedReward(input?: any) {
    const service = new KycCompletedRewardService();
    return await service.execute(input);
  }
}
