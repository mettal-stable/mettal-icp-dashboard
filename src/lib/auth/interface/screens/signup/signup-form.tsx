import {
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  LinearProgress,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useSignupFormHook } from "./hooks/signup-form.hook";
import { useEffect } from "react";

export interface ISignupForm {
  onProcess?(status: boolean): void;
}
export const SignupForm: React.FC<ISignupForm> = (props) => {
  const { onSubmit, processing, done } = useSignupFormHook();

  useEffect(() => {
    if (props.onProcess) {
      props.onProcess(processing);
    }
  }, [processing]);

  return (
    <Box component="form" autoComplete="" onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {processing ? (
          <Grid item xs={12}>
            <LinearProgress color="info" />
            <Alert color="info"> We are creating your account </Alert>
          </Grid>
        ) : null}

        {done ? (
          <Grid item xs={12}>
            <Alert color="success"> Your account was created! </Alert>
          </Grid>
        ) : null}

        {done ? null : (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Name"
                name="name"
                disabled={processing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                name="email"
                type="email"
                disabled={processing}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ bgcolor: blue[800] }}
                disabled={processing}
              >
                Create account
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};
