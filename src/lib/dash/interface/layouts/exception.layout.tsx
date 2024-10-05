import { Box } from "@mui/material";
import { ReactNode } from "react";
import theme from "@shared/interface/themes/theme.default";
import { DefaultNavbar } from "@shared/interface/components/navbar/default.navbar";
export interface IMainLayout {
  children: ReactNode;
}
export const ExceptionLayout: React.FC<IMainLayout> = (props) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "100%",
        bgcolor: theme.palette.background.default,
      }}
    >
      <DefaultNavbar />
      <Box sx={{ pt: 3 }}>{props.children}</Box>
    </Box>
  );
};
