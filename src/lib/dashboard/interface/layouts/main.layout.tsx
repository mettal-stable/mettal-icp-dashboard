import { Box } from "@mui/material";
import { ReactNode } from "react";
import theme from "@shared/interface/themes/theme.default";
import { MainNavbar } from "../components/main-navbar/main-navbar";
export interface IMainLayout {
  children: ReactNode;
}
export const MainLayout: React.FC<IMainLayout> = (props) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "100%",
        bgcolor: theme.palette.background.default,
      }}
    >
      <MainNavbar />
      <Box sx={{ pt: 3 }}>{props.children}</Box>
    </Box>
  );
};
