import { IWallet, Wallet } from "@account/domain/value-objects/wallet.model";
import { DestinationAccount } from "@dash/interface/screens/home/hooks/home.screen.hook";
import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { useState } from "react";

export interface IWindowSell {
  data: IWallet;
  open: boolean;
  processing: boolean;
  minAmount: number;
  destinationAccounts: DestinationAccount[];
  onClose(): void;
  onSubmit(input: any): void;
}

export interface Inputs {
  amount: string;
  destinationAccount: string | null;
}
export const WindowSell: React.FC<IWindowSell> = (props) => {
  const initAmount = Wallet.formatAmount(props.minAmount);
  const [inputs, setInputs] = useState<Inputs>({
    amount: initAmount,
    destinationAccount: null,
  });

  const onChangeInput = (key: string, value: any) => {
    let tmpInputs: any = { ...inputs };
    tmpInputs[key] = value;
    setInputs(tmpInputs);
  };
  const disableSubmitBtn = () => {
    if (props.processing) {
      return true;
    }
    if (inputs) {
      if (
        inputs?.amount === null ||
        inputs?.destinationAccount === null ||
        inputs?.amount.length === 0
      ) {
        return true;
      }
    }
    return false;
  };

  const disableInput = () => {
    if (props.processing) {
      return true;
    }

    return false;
  };

  const formatDecimals = (value: string) => {
    let valueNumber = Number(value).toFixed(2);
    return valueNumber;
  };

  const setMaxWallet = () => {
    onChangeInput("amount", props.data.balance_with_decimals);
  };

  const resetAmount = () => {
    onChangeInput("amount", initAmount);
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      onOpen={() => {}}
      ModalProps={{
        keepMounted: false,
      }}
      variant="temporary"
    >
      <Box sx={{ width: 500 }}>
        <Card elevation={0}>
          <Box
            sx={{ p: 1, background: "#eee", borderBottom: "1px solid #ccc" }}
          >
            <Stack direction="row" alignItems="center">
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>
                  Sell MXND Tokens from {props?.data?.name} Network
                </Typography>
              </Box>
              <IconButton
                aria-label="close winow"
                size="small"
                onClick={props.onClose}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>
          <CardContent sx={{ pr: 4 }}>
            <Grid2 container spacing={1}>
              <Grid2 size={12}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-amount"
                    type="number"
                    label="Amount"
                    value={inputs.amount}
                    disabled={disableInput()}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    onFocus={() => {
                      let value = Number(inputs.amount);
                      if (value === 0) {
                        onChangeInput("amount", "");
                      }
                    }}
                    onBlur={() => {
                      let value = inputs.amount;
                      if (value.length === 0) {
                        value = initAmount;
                      }
                      value = formatDecimals(value);
                      onChangeInput("amount", value);
                    }}
                    onChange={(event: any) => {
                      let value = event.currentTarget.value;
                      onChangeInput("amount", value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          disabled={disableInput()}
                          onClick={() => setMaxWallet()}
                        >
                          Max
                        </Button>

                        <IconButton
                          disabled={
                            inputs.amount === initAmount ||
                            inputs.amount.length === 0 ||
                            props.processing
                          }
                          edge="end"
                          onClick={() => resetAmount()}
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid2>
              <Grid2 size={12}>
                <Divider />
              </Grid2>
              <Grid2 size={12}>
                <Box sx={{ p: 2 }}>
                  <FormControl>
                    <FormLabel id="radio-buttons-group-destination-account">
                      Destination Account
                    </FormLabel>

                    {props.destinationAccounts.length > 0 ? (
                      <RadioGroup
                        aria-labelledby="radio-buttons-group-destination-account"
                        defaultValue="female"
                        name="destination-account"
                        value={inputs?.destinationAccount}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          onChangeInput(
                            "destinationAccount",
                            event.currentTarget.value
                          );
                        }}
                      >
                        {props.destinationAccounts.map(
                          (item: DestinationAccount, index: number) => {
                            return (
                              <FormControlLabel
                                key={"destination-account-index" + index}
                                value={item.number}
                                control={<Radio />}
                                disabled={disableInput()}
                                label={`${item.brand.toUpperCase()}: ${
                                  item.number
                                }`}
                              />
                            );
                          },
                          []
                        )}
                      </RadioGroup>
                    ) : null}
                  </FormControl>

                  <Box>
                    <Button disabled={disableInput()}> Add new </Button>
                  </Box>
                </Box>
              </Grid2>

              <Grid2 size={12}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={disableSubmitBtn()}
                  onClick={() =>
                    props.onSubmit({ ...inputs, wallet: props.data })
                  }
                >
                  Sell
                </Button>
                {props.processing ? <LinearProgress /> : null}
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Box>
    </SwipeableDrawer>
  );
};
