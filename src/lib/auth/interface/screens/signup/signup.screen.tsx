import { AuthFormHeader } from "@auth/interface/components/auth-form-header";
import { AuthLayout } from "@auth/interface/layouts/auth.layout";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import { useSignupFormHook } from "./hooks/signup-form.hook";

export const SignupScreen = () => {
  const { CurrentStep, ...hook } = useSignupFormHook();
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
        <Box sx={{ width: 600, height: 500 }}>
          <Card
            elevation={0}
            sx={{ p: 4, borderRadius: 2, border: "1px solid #ccc" }}
          >
            <AuthFormHeader title="Create an Account in Mettal" />
            <CardContent>
              <Box sx={{ mb: 5 }}>
                <Stepper
                  activeStep={hook.SignupSteps.indexOf(hook.step)}
                  alternativeLabel
                >
                  {hook.SignupSteps.map((label: any) => (
                    <Step key={label}>
                      <StepLabel>{label.toUpperCase()}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <CurrentStep
                onSubmitForm={hook.onSubmitForm}
                onSubmitOtp={hook.onSubmitOtp}
                processing={hook.processing}
                error={hook.error}
                inputs={hook.inputs}
                onOtpChange={hook.onOtpChange}
                otpValue={hook.otpValue}
                onLinkIcp={hook.onLinkIcp}
              />
            </CardContent>
            <CardActions>
              {hook.step === "form" || hook.processing === true ? (
                <Button
                  to="/login"
                  size="small"
                  sx={{ color: blue[600] }}
                  disabled={hook.processing}
                  component={RouterLink}
                >
                  Back to Login
                </Button>
              ) : null}
            </CardActions>
          </Card>
        </Box>
      </Container>
    </AuthLayout>
  );
};
