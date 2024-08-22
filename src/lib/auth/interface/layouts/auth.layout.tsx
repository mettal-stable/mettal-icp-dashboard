import { Box } from "@mui/material";
import { ReactNode } from "react";
import { AuthNavbar } from "../components/auth.navbar";
import theme from "@shared/interface/themes/theme.default";
export interface IAuthLayout {
  children: ReactNode;
}
export const AuthLayout: React.FC<IAuthLayout> = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: theme.palette.background.default,
      }}
    >
      <AuthNavbar />
      {props.children}
    </Box>
  );
};
