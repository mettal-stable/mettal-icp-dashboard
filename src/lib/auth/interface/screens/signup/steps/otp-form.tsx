import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

export interface IOtpForm {
  onSubmitOtp: (event: React.FormEvent<HTMLFormElement>) => void;
  onOtpChange: (value: string) => void;
  processing: boolean;
  error: any;
  otpValue: string;
}

export const OtpForm: React.FC<IOtpForm> = (props) => {
  return (
    <Box component="form" onSubmit={props.onSubmitOtp}>
      <Grid2 container spacing={2}>
        {props.processing ? null : (
          <Grid2 size={12}>
            <Typography variant="body1"> Enter your code:</Typography>
          </Grid2>
        )}

        {props.processing ? (
          <>
            <Grid2
              size={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "100px" }}
            >
              <Stack direction="column">
                <CircularProgress color="info" size={60} />
              </Stack>
            </Grid2>
            <Grid2 size={12}>
              <Alert sx={{ ml: 2 }} variant="outlined" severity="info">
                Verifying your code
              </Alert>
            </Grid2>
          </>
        ) : (
          <>
            <Grid2 size={12}>
              <MuiOtpInput
                length={6}
                value={props.otpValue}
                onChange={props.onOtpChange}
                sx={{ gap: 1 }}
                TextFieldsProps={{
                  disabled: false,
                  size: "small",
                  error: props.error ? true : false,
                }}
              />
            </Grid2>
            <Grid2 size={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color={props.error ? "info" : "primary"}
                disabled={props.processing || props.otpValue.length < 6}
              >
                Verify Code
              </Button>
            </Grid2>
          </>
        )}
      </Grid2>
    </Box>
  );
};
