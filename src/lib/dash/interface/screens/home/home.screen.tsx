import { CardBalance } from "@dash/interface/components/card-balance/card-balance";
import { CardInfo } from "@dash/interface/components/card-info/card-info";
import { CardWalletsSection } from "@dash/interface/components/card-wallets-section/card-wallets-section";
import { HomeTransactions } from "@dash/interface/components/home-transactions/home-transactions";
import MarketChart from "@dash/interface/components/market-chart/market-chart";
import { ScreenTitle } from "@dash/interface/components/screen-title/screen-title";
import { WindowSell } from "@dash/interface/components/window-sell/window-sell";
import { MainLayout } from "@dash/interface/layouts/main.layout";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid2,
  Stack,
} from "@mui/material";
import { KycStatus, useHomeScreenHook } from "./hooks/home.screen.hook";
export const HomeScreen = () => {
  const hook = useHomeScreenHook();
  return (
    <MainLayout
      alert={
        hook.account?.kyc?.status !== KycStatus.COMPLETED ? (
          <Alert
            severity={
              hook.account?.kyc?.status === KycStatus.IN_PROGRESS
                ? "info"
                : "warning"
            }
            variant="filled"
            sx={{ borderRadius: 0, textAlign: "center" }}
            action={
              hook.account?.kyc?.status === KycStatus.IN_PROGRESS ? null : (
                <Button
                  size="small"
                  variant="contained"
                  onClick={hook.onStartKyc}
                  disabled={hook.kycLoading}
                  startIcon={
                    hook.kycLoading ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : null
                  }
                >
                  Start KYC
                </Button>
              )
            }
          >
            {hook.account?.kyc?.status === KycStatus.IN_PROGRESS ? (
              <Box>Your KYC is in Progress</Box>
            ) : (
              <Box>
                {" "}
                You are not verified, please complete your KYC, and{" "}
                <strong>win $10 MXND</strong>
              </Box>
            )}
          </Alert>
        ) : null
      }
    >
      {hook.showSellWindow ? (
        <WindowSell
          minAmount={hook.minAmount}
          open={hook.showSellWindow}
          data={hook.sellWallet}
          processing={hook.formProcessing}
          onClose={() => {
            hook.setShowSellWindow(false);
          }}
          onSubmit={hook.sellCrypto}
          destinationAccounts={hook.destinationAccounts}
        />
      ) : null}
      <Container maxWidth="md">
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 12, md: 9 }}>
            <ScreenTitle label={"Dashboard"} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => {}}
              >
                Transfer
              </Button>
              <Button variant="contained" color="secondary" fullWidth>
                Deposit
              </Button>
            </Stack>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <CardBalance
              label={hook.balance.amount_formated}
              currency="MXND"
              sublabel={"Current Balance "}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <CardWalletsSection
              data={hook.wallets}
              onSell={hook.onShowSellWindow}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 12 }}>
            <HomeTransactions />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <MarketChart />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <CardInfo
              label="Get Sandbox API"
              context="Use the Sandbox API to test our funcionalities or explor our sample app "
              btnLabel="Get API Key"
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <CardInfo
              label="See our documentation"
              context="Find guides and references tod help with integration"
              btnLabel="See Guides"
            />
          </Grid2>
        </Grid2>
      </Container>
    </MainLayout>
  );
};

export default HomeScreen;
