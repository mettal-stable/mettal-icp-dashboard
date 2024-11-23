import { InfoRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "@shared/interface/themes/theme.default";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ForwardIcon from "@mui/icons-material/Forward";
import WalletIcon from "@mui/icons-material/Wallet";
export interface ICardBalance {
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  currency?: string;
  onClick?(): void;
  onInfoIcon?(): void;
}
export const CardBalance: React.FC<ICardBalance> = (props) => {
  const amountStyles = {
    typography: {
      xs: {
        fontFamily: "Poppins",
        fontSize: "1.8rem",
        fontWeight: 700,
        color: theme.palette.primary.contrastText,
      },
      md: { fontFamily: "Poppins", fontSize: "2.2rem", fontWeight: 500 },
    },
  };

  const currencyStyles = {
    typography: {
      xs: {
        fontFamily: "Poppins",
        fontSize: "0.8rem",
        color: theme.palette.primary.contrastText,
      },
      md: { fontFamily: "Poppins" },
    },
  };

  const sublabelStyles = {
    fontWeight: 300,
    fontSize: "1rem",
    color: theme.palette.secondary.contrastText,
  };
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
      }}
    >
      <CardContent sx={{ flexGrow: 1, flexDirection: "column", p: 0 }}>
        <Box
          sx={{
            minHeight: 100,
            background: theme.palette.bgGradient.default,
            p: 2,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h2" sx={currencyStyles}>
              {props.currency}
            </Typography>
            <Typography sx={amountStyles}>{props.label}</Typography>
          </Stack>

          <Stack direction="row">
            <Typography sx={sublabelStyles}>{props.sublabel}</Typography>
            <Tooltip title={"What is this?"} placement="top">
              <IconButton
                onClick={() => {
                  if (props.onInfoIcon) {
                    props.onInfoIcon();
                  }
                }}
              >
                <InfoRounded
                  htmlColor="#fff"
                  fontSize="small"
                  sx={{ mt: -0.7 }}
                />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Box sx={{ p: 2, pt: 2 }}>
          <Grid2 container spacing={1} size={12}>
            <Grid2 size={{ xs: 12, md: 12 }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ height: 50 }}
                startIcon={<WalletIcon />}
                color="secondary"
              >
                Connect Wallet
              </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 12 }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ height: 50 }}
                color="secondary"
                startIcon={<SwapHorizIcon />}
              >
                Swap
              </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 12 }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ height: 50 }}
                color="secondary"
                startIcon={<ForwardIcon />}
              >
                Send Tokens
              </Button>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 12 }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ height: 50 }}
                color="secondary"
                startIcon={<ForwardIcon />}
              >
                Transfer
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </CardContent>
    </Card>
  );
};
