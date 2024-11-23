import { AccountAdapter } from "@dash/data/account.adapter";
import { IWallet } from "@dash/domain/models/wallet.model";
import { KycVerifier } from "@shared/infra/utils/kyc/kyc.";
import { TransactionAdapter } from "@transactions/data/transactions.adapter";
import { useEffect, useState } from "react";

export interface DestinationAccount {
  number: string;
  brand: string;
  default: boolean;
}

const destination_accounts: DestinationAccount[] = [
  { number: "4242424242424242", brand: "visa", default: true },
  { number: "5555555555554444", brand: "mc", default: false },
];

type Balance = {
  amount_formated: string;
  amount: number;
};

export enum KycVeredict {
  APPROVED = "approved",
  REJECTED = "rejected",
  NONE = "none",
}
export enum KycStatus {
  STARTED = "started",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "completed",
  NOT_STARTED = "not_started",
  NEEDS_MANUAL_REVIEW = "needs_manual_review",
}

export const useHomeScreenHook = () => {
  const [showSellWindow, setShowSellWindow] = useState(false);
  const [sellWallet, setSellWallet] = useState<any>();
  const [wallets, setWallets] = useState([]);
  const [account, setAccount] = useState<any>();
  const [accountLoading, setAccountLoading] = useState<boolean>(false);
  const [kycLoading, setKycLoading] = useState<boolean>(false);

  const [formProcessing, setFormProcessing] = useState<boolean>(false);
  const [destinationAccounts, setDestinationAccounts] = useState<
    DestinationAccount[]
  >([]);
  const [balance, setBalance] = useState<Balance>({
    amount: 0,
    amount_formated: "0",
  });

  const getAccount = async () => {
    try {
      setAccountLoading(true);
      const adapter = new AccountAdapter();
      let response = await adapter.getAccount();
      setAccount(response);
    } catch (error) {
      console.log(error);
    } finally {
      setAccountLoading(false);
    }
  };

  const calculateBalance = (wallets: IWallet[]) => {
    let balance = wallets.reduce((a: any, b: any) => {
      return a + b.balance;
    }, 0);
    setBalance({
      amount: balance,
      amount_formated: new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(Number(balance) / 100),
    });
  };

  const getWallets = async () => {
    const adapter = new AccountAdapter();
    let { data } = await adapter.getWallets();

    if (data) {
      calculateBalance(data);
      setWallets(data);
    }
  };

  const getDestinationAccounts = () => {
    setDestinationAccounts(destination_accounts);
  };

  const onShowSellWindow = async (inputs: any) => {
    setShowSellWindow(true);
    setSellWallet(inputs);
  };

  const sellCrypto = async (inputs: any) => {
    setFormProcessing(true);
    let adapter = new TransactionAdapter();
    await adapter.sellCrypto(inputs);
    setTimeout(() => {
      setFormProcessing(false);
    }, 3000);
  };

  const onStartKyc = async () => {
    const kyc = new KycVerifier();
    setKycLoading(true);
    await kyc.execute({ user: account.user }, (msg: any) => {
      console.log({ msg });
      switch (msg) {
        case "CANCELED":
          break;
        case "FINISHED":
          getAccount();
          break;
        case "STARTED":
          //
          break;
        case "RELOAD_REQUEST":
          //
          break;
      }
    });
    setKycLoading(false);
  };

  const onShowTransfer = async () => {
    let adapter = new TransactionAdapter();
    let response = await adapter.kycCompletedReward();
    console.log({ response });
  };

  useEffect(() => {
    if (account) {
      getWallets();
      getDestinationAccounts();
    }
  }, [account]);

  useEffect(() => {
    getAccount();
  }, []);

  return {
    wallets,
    balance,
    showSellWindow,
    setShowSellWindow,
    onShowSellWindow,
    sellWallet,
    destinationAccounts,
    sellCrypto,
    formProcessing,
    account,
    onStartKyc,
    kycLoading,
    accountLoading,
    onShowTransfer,
  };
};
