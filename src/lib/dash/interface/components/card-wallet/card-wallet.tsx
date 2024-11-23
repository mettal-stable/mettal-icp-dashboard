import { IWallet } from "@dash/domain/models/wallet.model";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import theme from "@shared/interface/themes/theme.default";

export interface ICardWallet {
  data: IWallet;
  onSell(value: any): void;
  onInfoIcon?(): void;
}
export const CardWallet: React.FC<ICardWallet> = (props) => {
  return (
    <Card sx={{}}>
      <CardContent sx={{ m: 0, pb: 0 }}>
        <Typography sx={{ fontSize: "1.1rem" }}>
          <strong>{props.data.network.toUpperCase()}</strong> :{" "}
          {props.data.balance_formated} MXND
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={!props.data.actions.sell}
          sx={{
            color: theme.palette.secondary.main,
          }}
          onClick={() => props.onSell(props.data)}
        >
          Sell
        </Button>

        <Button
          size="small"
          disabled={!props.data.actions.buy}
          sx={{
            color: theme.palette.secondary.main,
          }}
        >
          Buy
        </Button>

        <Button
          size="small"
          disabled={!props.data.actions.deposit}
          sx={{
            color: theme.palette.secondary.main,
          }}
        >
          Deposit
        </Button>

        <Button
          size="small"
          color="secondary"
          disabled={!props.data.actions.swap}
          sx={{
            color: theme.palette.secondary.main,
          }}
        >
          Swap
        </Button>
      </CardActions>
    </Card>
  );
};
