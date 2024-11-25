import { ICPProvider } from "@auth/data/icp.provider";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory } from "./icrc-idl";

export class IcpCanisterAdapter {
  private agent?: any;
  private icp?: any;
  private principal?: any;
  private actor?: any;
  constructor() {
    this.icp = new ICPProvider();
  }

  async init(): Promise<void> {
    await this.icp.init();

    const host = import.meta.env.VITE_ICRC_PROVIDER;
    const identity = await this.icp.getIdentity();
    this.principal = await this.icp.getPrincipal();
    // console.log({ principal: this.principal.toText() });
    this.agent = await HttpAgent.create({
      host,
      identity,
    });

    // if (process.env.NODE_ENV !== "production") {
    this.agent.fetchRootKey();
    // }
  }

  async getIcrcCanisterActor(): Promise<any> {
    await this.init();
    const canisterId = import.meta.env.VITE_ICRC_CANISTER_ID;
    this.actor = Actor.createActor(idlFactory, {
      agent: this.agent,
      canisterId,
    });
  }
  async approveTransfer(input: any) {
    try {
      await this.getIcrcCanisterActor();
      const owner = this.principal;
      const spender = Principal.fromText(import.meta.env.VITE_ICRC_SPENDER);

      const args = {
        spender: {
          owner: spender,
          subaccount: [],
        },
        from: { owner: owner, subaccount: [] },
        amount: BigInt(input.amount),
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        expected_allowance: [],
        expires_at: [],
      };

      let response = await this.actor.icrc2_approve(args);

      return response.Ok ? true : false;
    } catch (error: any) {
      console.log({ error });
      throw Error(error.message);
    }
  }
}
