import { Card, CardContent, Typography } from "@mui/material";
export interface ICardValue {
  label?: React.ReactNode;
  value?: React.ReactNode;
  btnLabel?: React.ReactNode;
  onClick?(): void;
}
export const CardValue: React.FC<ICardValue> = (props) => {
  return (
    <Card
      elevation={0}
      sx={{
        cursor: "pointer",
        border: "1px solid #ccc",
        transition: "all 300ms ease-in",
        boxShadow: "11px 17px 60px -51px rgba(0,0,0,0.56)",
        "&:hover": {
          border: "1px solid #999",
          backgroundColor: "#f6f6f6",
          boxShadow: "11px 17px 60px -31px rgba(0,0,0,0.56)",
        },
      }}
    >
      <CardContent>
        <Typography color="text.secondary">{props.label}</Typography>
        <Typography sx={{ fontSize: "2.3rem" }}>{props.value}</Typography>
      </CardContent>
    </Card>
  );
};
