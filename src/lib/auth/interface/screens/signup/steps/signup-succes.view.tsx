import { CheckCircleOutline } from "@mui/icons-material";
import { Grid2, Stack, Box, Typography } from "@mui/material";

export const SingupSuccessView = () => {
  return (
    <>
      <Grid2
        size={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100px" }}
      >
        <Stack direction="column" alignItems="center">
          <CheckCircleOutline sx={{ fontSize: 80, color: "success.main" }} />
        </Stack>
      </Grid2>
      <Grid2 size={12}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "success.main",
              fontSize: "1.2rem",
            }}
          >
            Your account was successfully created!
          </Typography>
        </Box>
      </Grid2>
    </>
  );
};
