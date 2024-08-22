import { Button, Container, Grid, Stack } from "@mui/material";
import { MainLayout } from "@dash/interface/layouts/main.layout";
import { ScreenTitle } from "@dash/interface/components/screen-title/screen-title";
import { CardAmount } from "@dash/interface/components/card-amount/card-amount";
import { CardInfo } from "@dash/interface/components/card-info/card-info";
export const HomeScreen = () => {
  return (
    <MainLayout>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ScreenTitle label={"Dashboard"} />
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              sx={{ mb: 2 }}
            >
              <Button variant="outlined" color="secondary">
                Transfer
              </Button>
              <Button variant="contained" color="secondary">
                Deposit
              </Button>
            </Stack>
            <CardAmount
              label="12,000,000,000.00 "
              currency="MXN"
              sublabel={"Current Balance "}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <CardInfo
              label="Get Sandox API"
              context="Use the sandbox API to test our funcionalities or explor our sample app "
              btnLabel="Get API Key"
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <CardInfo
              label="See our documentation"
              context="Find guides and references to help with integration"
              btnLabel="See Guides"
            />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default HomeScreen;
