import { IWallet, Wallet } from "@account/domain/value-objects/wallet.model";
import { AuthContext } from "@auth/interface/providers/auth.provider";
import { KycVerifier } from "@shared/infra/utils/kyc/kyc.";
import { SellTokensService } from "@transactions/application/sell-tokens.service";

import { AccountAdapter } from "@dash/data/account.adapter";
import { NotificationContext } from "@shared/providers/notification.provider";
import { SocketContext } from "@shared/providers/socket-provider";
import { TransactionAdapter } from "@transactions/data/transactions/transactions.adapter";
import { useContext, useEffect, useState } from "react";

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
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  NOT_STARTED = "not_started",
  NEEDS_MANUAL_REVIEW = "needs_manual_review",
}

export const useHomeScreenHook = () => {
  const minAmount = 5;
  const { account, getAccount } = useContext<any>(AuthContext);
  const { socketChannel } = useContext<any>(SocketContext);
  const { useInfoAlert, useErrorAlert, useSuccessAlert } =
    useContext<any>(NotificationContext);
  const [showSellWindow, setShowSellWindow] = useState(false);
  const [sellWallet, setSellWallet] = useState<any>();
  const [wallets, setWallets] = useState([]);
  const [kycLoading, setKycLoading] = useState<boolean>(false);
  const [listeningEvents, setListeningEvents] = useState<boolean>(false);

  const [formProcessing, setFormProcessing] = useState<boolean>(false);
  const [destinationAccounts, setDestinationAccounts] = useState<
    DestinationAccount[]
  >([]);
  const [balance, setBalance] = useState<Balance>({
    amount: 0,
    amount_formated: "0",
  });

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
    try {
      setFormProcessing(true);
      if (inputs.amount < minAmount) {
        useErrorAlert({
          message: `Amount cannot be lower than ${Wallet.formatAmount(
            minAmount,
            true
          )}`,
        });
        setFormProcessing(false);
        return;
      }
      const service = new SellTokensService();
      inputs.amount = inputs.amount * 100;
      let response = await service.execute(inputs);

      if (response) {
        setShowSellWindow(false);
        useSuccessAlert({
          message: "Tokens sell transaction has been received",
        });
      }
    } catch (error: any) {
      useErrorAlert({ message: error.message });
    } finally {
      setFormProcessing(false);
    }
  };

  const onStartKyc = async () => {
    const kyc = new KycVerifier();
    setKycLoading(true);
    await kyc.execute({ user: account.user }, (msg: any) => {
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
    await adapter.kycCompletedReward();
  };

  const onNewIncome = async (data: any) => {
    await getWallets();
    useInfoAlert({
      message: data.reason,
    });
  };

  const listenToEvents = () => {
    socketChannel?.bind("balance-updated", (data: any) => {
      onNewIncome(data);
    });

    setListeningEvents(true);
  };

  useEffect(() => {
    if (wallets.length > 0) {
      calculateBalance(wallets);
    }
  }, [wallets]);

  useEffect(() => {
    if (wallets.length > 0) {
      if (!listeningEvents) {
        listenToEvents();
      }
    }
  }, [wallets]);

  useEffect(() => {
    if (account) {
      getDestinationAccounts();
      setWallets(account.wallets);
    }
  }, [account]);

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
    onShowTransfer,
    minAmount,
  };
};
