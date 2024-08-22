import { AuthLayout } from "@auth/interface/layouts/auth.layout";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import { SignupForm } from "./signup-form";
import { useState } from "react";

export const SignupScreen = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  return (
    <AuthLayout>
      <Container
        maxWidth="lg"
        sx={{
          height: "calc(50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 500, height: 500 }}>
          <Card
            elevation={0}
            sx={{ p: 4, borderRadius: 2, border: "1px solid #ccc" }}
          >
            <CardHeader
              title="Create Account in Metal "
              titleTypographyProps={{ fontSize: "2rem" }}
            />
            <CardContent>
              <SignupForm
                onProcess={(status: boolean) => {
                  setProcessing(status);
                }}
              />
            </CardContent>
            <CardActions>
              <Button
                to="/login"
                component={RouterLink}
                size="small"
                sx={{ color: blue[600] }}
                disabled={processing}
              >
                Back to Login
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </AuthLayout>
  );
};
