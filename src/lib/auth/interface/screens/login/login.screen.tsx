import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Stack,
} from "@mui/material";
import { AuthLayout } from "@auth/interface/layouts/auth.layout";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth.provider";
import { blue, purple } from "@mui/material/colors";

import { Link as RouterLink } from "react-router-dom";

export const LoginScreen = () => {
  const { login } = useContext<any>(AuthContext);

  return (
    <AuthLayout>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 6,
        }}
      >
        <Box sx={{ width: 500, height: 500 }}>
          <Card
            elevation={0}
            sx={{ p: 4, borderRadius: 2, border: "1px solid #ccc" }}
          >
            <CardHeader
              title={"Sign in to " + import.meta.env.VITE_COMPANY_SHORT_NAME}
              titleTypographyProps={{ fontSize: "2rem" }}
            />
            <CardContent>
              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ color: blue[800] }}
                  onClick={() => {
                    login();
                  }}
                >
                  Signin with ICP
                </Button>
                <Button
                  fullWidth
                  disabled
                  variant="outlined"
                  sx={{ color: purple[300] }}
                  onClick={() => {
                    // login();
                  }}
                >
                  Signin with Passkey
                </Button>
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                to="/signup"
                component={RouterLink}
                size="small"
                sx={{ color: blue[600] }}
              >
                Create an account
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </AuthLayout>
  );
};
