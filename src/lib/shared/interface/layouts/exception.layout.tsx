import { Box } from "@mui/material";
import theme from "@shared/interface/themes/theme.default";
import { ReactNode } from "react";
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
      <Box sx={{ pt: 3 }}>{props.children}</Box>
    </Box>
  );
};
