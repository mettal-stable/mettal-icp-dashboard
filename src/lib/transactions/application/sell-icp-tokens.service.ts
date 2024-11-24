import { TransactionAdapter } from "@transactions/data/transactions/transactions.adapter";
import { InputSellToken } from "./sell-tokens.service";

export class SellIcpTokensService {
  inputs?: InputSellToken;
  transactions?: TransactionAdapter;
  constructor() {}
  async execute(inputs: InputSellToken) {
    try {
      this.transactions = new TransactionAdapter();
      this.inputs = inputs;
      // get approve transaction
      let approved = await this.approve();
      if (approved) {
        // sell tokens
        let response = await this.sell();
        return response;
      }
    } catch (error) {
      throw new Error("Approved transfer has failed");
    }
  }

  async approve() {
    return await this.transactions?.approveIcpTransfer(this.inputs);
    return true;
  }
  async sell() {
    let response = await this.transactions?.sellIcpToken(this.inputs);
    return response;
  }
}
