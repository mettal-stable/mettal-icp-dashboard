import { ScreenTitle } from "@dash/interface/components/screen-title/screen-title";
import { ExceptionLayout } from "@dash/interface/layouts/exception.layout";
import { Container, Grid } from "@mui/material";
export const NotFoundRouteScreen = () => {
  return (
    <ExceptionLayout>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ScreenTitle
              label={"Route Not Found"}
              sublabel="The route that you are  looking does not exists"
            />
          </Grid>
        </Grid>
      </Container>
    </ExceptionLayout>
  );
};

export default NotFoundRouteScreen;
