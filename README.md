# Mettal Dashboard + ICP Frontend Auth

### [Dashboard Demo](https://dashboard.mettal.mx/)

At the moment this demo does not have a SSL, you need to accept it to access

### To run app

```shell
  yarn dev
```

```
dfx identity get-principal --identity mettal-stc

```

hsm4o-bznht-qamu5-zescv-gqrgn-wjwa2-4krco-r57ql-lj3fj-7cedg-eae
836f0c8d9d7b96f66ca1c136cd1b0670cf39a395c1d816deac5f125d59428a9d

mettal-stc
principal : hxdrg-c5lyh-bmfna-xyae5-fv6tq-lj6mb-xsubn-spk2v-lmwxy-ww5bq-uqe
account-id : e22988bb267b693c718c084852dd1af314516a8a65c090866c563516d73d4d1c

dfx ledger account-id --of-principal
dfx ledger account-id --of-principal hxdrg-c5lyh-bmfna-xyae5-fv6tq-lj6mb-xsubn-spk2v-lmwxy-ww5bq-uqe
export TO_ACCOUNT = "e22988bb267b693c718c084852dd1af314516a8a65c090866c563516d73d4d1c"
dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai transfer '(record { to = $(python3 -c 'print("vec{" + ";".join([str(b) for b in bytes.fromhex("'$TO_ACCOUNT'")]) + "}")'); memo = 1:nat64; amount = record {e8s = 200_000_000 }; fee = record { e8s = 10_000 }; })'
