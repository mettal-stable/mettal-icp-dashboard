import { Box } from "@mui/material";
import { ReactNode } from "react";
import { MainNavbar } from "../components/main-navbar/main-navbar";
export interface IMainLayout {
  children: ReactNode;
  alert?: ReactNode;
}
export const MainLayout: React.FC<IMainLayout> = (props) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
      }}
    >
      <MainNavbar />
      {props.alert ? props.alert : null}
      <Box sx={{ pt: 3 }}>{props.children}</Box>
    </Box>
  );
};
