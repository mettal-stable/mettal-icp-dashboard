import { Typography } from "@mui/material";

export interface IScreenTitle {
  label: React.ReactNode;
  sublabel?: React.ReactNode;
}
export const ScreenTitle: React.FC<IScreenTitle> = (props) => {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {props.label}
      </Typography>
      {props.sublabel ? (
        <Typography variant="body1">{props.sublabel}</Typography>
      ) : null}
    </>
  );
};
