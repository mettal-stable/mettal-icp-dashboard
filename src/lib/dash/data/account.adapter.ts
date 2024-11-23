import { GetAccountService } from "./services/get-account.service";
import { GetWalletsService } from "./services/get-wallets.service";

export class AccountAdapter {
  async getAccount() {
    const service = new GetAccountService();
    return await service.execute();
  }

  async getWallets() {
    const service = new GetWalletsService();
    return await service.execute();
  }
}
