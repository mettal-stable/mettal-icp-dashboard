import { AuthLayout } from "@auth/interface/layouts/auth.layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth.provider";

import { AuthFormHeader } from "@auth/interface/components/auth-form-header";
import { Link as RouterLink } from "react-router-dom";

import icpLogo from "@assets/internet-computer-icp-logo.png";
import { PersonAdd } from "@mui/icons-material";

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
            <AuthFormHeader
              title={"Sign in to " + import.meta.env.VITE_COMPANY_SHORT_NAME}
            />
            <CardContent>
              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    login();
                  }}
                  startIcon={
                    <img src={icpLogo} alt="ICP" width={24} height={24} />
                  }
                >
                  Signin with ICP Passkey
                </Button>
                <Typography sx={{ textAlign: "center" }}>OR </Typography>

                <Button
                  fullWidth
                  to="/signup"
                  variant="outlined"
                  component={RouterLink}
                  startIcon={<PersonAdd />}
                >
                  Create an account
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </AuthLayout>
  );
};
