import { BaseModel } from "@shared/domain/models/base.model";

export interface IWallet {
  network?: string;
  name?: string;
  balance: number;
  address?: string;
  default?: boolean;
  balance_formated?: string;
  balance_with_decimals?: string;
  actions?: {
    buy: boolean;
    swap?: boolean;
    deposit?: boolean;
    sell?: boolean;
    withdraw?: boolean;
  };
  limits?: {
    sell_amount?: number;
    buy_amount?: number;
  };
}

export class Wallet extends BaseModel implements IWallet {
  network?: string;
  address?: string;
  balance: number = 0;
  actions: any = {
    buy: false,
    swap: false,
    deposit: false,
    sell: false,
    withdraw: false,
  };
  limits: any = {
    sell_amount: 0,
    buy_amount: 0,
  };
  balance_formated?: string;
  balance_with_decimals?: string;
  default?: boolean;
  constructor(input?: IWallet) {
    super();
    this.setNetwork(input?.network);
    this.setName(input?.name);
    this.setAddress(input?.address);
    this.setBalance(input?.balance);
    this.setActions(input?.actions);
    this.setLimits(input?.limits);
    this.setBalanceFormated(input?.balance_formated);
    this.setBalanceWithDecimals(input?.balance_with_decimals);
  }
  setNetwork(value?: string) {
    if (value) this.network = value;
  }

  setAddress(value?: string) {
    if (value) this.address = value;
  }
  setBalance(value?: number) {
    if (typeof value === "number") {
      this.balance = value;
    }
  }

  setActions(value?: any) {
    if (value) {
      this.actions = value;
    }
  }
  setLimits(value?: any) {
    if (value) this.limits = value;
  }
  setBalanceFormated(value?: string) {
    if (value) {
      return (this.balance_formated = value);
    }
    if (Number(this.balance) >= 0) {
      this.balance_formated = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(Number(this.balance) / 100);
    }
  }
  setBalanceWithDecimals(value?: string) {
    if (value) {
      return (this.balance_with_decimals = value);
    }

    if (Number(this.balance) >= 0) {
      const balance_formated = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(Number(this.balance) / 100);
      this.balance_with_decimals = balance_formated.replace("$", "");
    }
  }

  static formatAmount(amount: number, allowPrefix?: boolean): string {
    let value = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(Number(amount));

    if (!allowPrefix) {
      return value.replace("$", "");
    }
    return value;
  }
}
