import { IWallet } from "../../account/domain/value-objects/wallet.model";
import { SellIcpTokensService } from "./sell-icp-tokens.service";

export interface InputSellToken {
  amount: number;
  wallet: IWallet;
}

export class SellTokensService {
  service: any;
  inputs?: InputSellToken;
  constructor() {}
  async execute(inputs: InputSellToken) {
    this.inputs = inputs;
    this.factoryService();
    return await this.service.execute(this.inputs);
  }

  factoryService() {
    switch (this.inputs?.wallet.network) {
      case "icp":
        this.service = new SellIcpTokensService();
        break;
    }
  }
}
