import { Card, CardContent, CardHeader, Grid2 } from "@mui/material";
import theme from "@shared/interface/themes/theme.default";
import { CardWallet } from "../card-wallet/card-wallet";
import { IWallet } from "@dash/domain/models/wallet.model";

export interface ICardWalletsSection {
  data: IWallet[];
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  currency?: string;
  onClick?(): void;
  onSell(value: any): void;
  onInfoIcon?(): void;
}
export const CardWalletsSection: React.FC<ICardWalletsSection> = (props) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #ccc",
        borderRadius: 1,
        height: "100%",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: "all 300ms ease-in",
        boxShadow: "11px 17px 60px -81px rgba(0,0,0,0.56)",
        background: theme.palette.bgGradient.default,
      }}
    >
      <CardHeader
        title="Wallets"
        sx={{
          color: theme.palette.primary.contrastText,
        }}
      />
      <CardContent sx={{ p: 0, flexGrow: 1, flexDirection: "column" }}>
        <Grid2 container spacing={1} size={12} sx={{ p: 2 }}>
          {props?.data.map((wallet: IWallet, index: number) => {
            return (
              <Grid2 key={"wallet-card-" + index} size={{ xs: 12 }}>
                <CardWallet data={wallet} onSell={props.onSell} />
              </Grid2>
            );
          })}
        </Grid2>
      </CardContent>
    </Card>
  );
};
