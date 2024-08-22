import { Typography } from "@mui/material";

export interface IScreenTitle {
  label: React.ReactNode;
}
export const ScreenTitle: React.FC<IScreenTitle> = (props) => {
  return (
    <Typography variant="h4" sx={{ fontWeight: 600 }}>
      {" "}
      {props.label}{" "}
    </Typography>
  );
};
