export interface IWallet {
  network: string;
  name: string;
  balance: number;
  default?: boolean;
  enabled_sell: boolean;
  enabled_swap: boolean;
  enabled_deposit: boolean;
  balance_formated?: string;
  balance_with_decimals?: string;
  actions: {
    sell: boolean;
    buy: boolean;
    deposit: boolean;
    swap: boolean;
    withdraw: boolean;
  };
  limits: {
    sell_amount: number;
    buy_amount: number;
  };
}
