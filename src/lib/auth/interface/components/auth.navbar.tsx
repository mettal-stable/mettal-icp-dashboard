import { AppBar, Toolbar, Typography } from "@mui/material";

export const AuthNavbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {import.meta.env.VITE_COMPANY_LONG_NAME}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
