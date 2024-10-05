import { CardAmount } from "@dash/interface/components/card-amount/card-amount";
import { CardInfo } from "@dash/interface/components/card-info/card-info";
import { ScreenTitle } from "@dash/interface/components/screen-title/screen-title";
import { MainLayout } from "@dash/interface/layouts/main.layout";
import { Button, Container, Grid2, Stack } from "@mui/material";
export const HomeScreen = () => {
  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ pb: 3 }}>
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
              <Button variant="outlined" color="secondary" fullWidth>
                Transfer
              </Button>
              <Button variant="contained" color="secondary" fullWidth>
                Deposit
              </Button>
            </Stack>
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <CardAmount
              label="12,000,000,000.00 "
              currency="MXM"
              sublabel={"Current Balance "}
            />
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
