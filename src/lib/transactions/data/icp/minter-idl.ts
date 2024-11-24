export const minterIdlFactory = ({ IDL }: any) => {
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const ApproveArgs = IDL.Record({
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
    expected_allowance: IDL.Opt(IDL.Nat),
    expires_at: IDL.Opt(IDL.Nat64),
    spender: Account,
  });
  const Result_1 = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
  const burnArgs = IDL.Record({ fromAccount: Account, amount: IDL.Nat });
  const Result = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
  const mintArgs = IDL.Record({ toAccount: Account, amount: IDL.Nat });
  return IDL.Service({
    approve: IDL.Func([ApproveArgs], [Result_1], []),
    burnTokens: IDL.Func([burnArgs], [Result], []),
    getBalance: IDL.Func([IDL.Principal], [Result_1], []),
    mintTokens: IDL.Func([mintArgs], [Result], []),
  });
};
export const init = () => {
  return [];
};
