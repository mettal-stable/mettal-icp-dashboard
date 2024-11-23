import { SignupInput } from "@auth/interface/providers/auth.provider";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Stack,
  TextField,
} from "@mui/material";
import { blue } from "@mui/material/colors";

export interface ISignupForm {
  onSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  processing: boolean;
  error: any;
  inputs: SignupInput;
}
export const SignupForm: React.FC<ISignupForm> = (props) => {
  return (
    <Box component="form" autoComplete="" onSubmit={props.onSubmitForm}>
      <Grid2 container spacing={2}>
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
          </>
        ) : (
          <>
            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                size="small"
                label="Name"
                name="name"
                disabled={props.processing}
                defaultValue={props.inputs.name}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                size="small"
                label="Last Name"
                name="last-name"
                disabled={props.processing}
                defaultValue={props.inputs.last_name}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                size="small"
                label="Email"
                name="email"
                type="email"
                disabled={props.processing}
                defaultValue={props.inputs.email}
              />
            </Grid2>
            <Grid2 size={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ bgcolor: blue[800] }}
                disabled={props.processing}
              >
                Create account
              </Button>
            </Grid2>
          </>
        )}
      </Grid2>
    </Box>
  );
};
