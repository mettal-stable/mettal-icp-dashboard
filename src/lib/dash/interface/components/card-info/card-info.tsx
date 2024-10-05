import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
export interface ICardInfo {
  label?: React.ReactNode;
  context?: React.ReactNode;
  btnLabel?: React.ReactNode;
  onClick?(): void;
}
export const CardInfo: React.FC<ICardInfo> = (props) => {
  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        cursor: "pointer",
        border: "1px solid #ccc",
        transition: "all 300ms ease-in",
        borderRadius: 3,
        boxShadow: "11px 17px 60px -51px rgba(0,0,0,0.56)",
        "&:hover": {
          border: "1px solid #999",
          backgroundColor: "#f6f6f6",
          boxShadow: "11px 17px 60px -31px rgba(0,0,0,0.56)",
        },
      }}
    >
      <CardHeader
        title={props.label}
        titleTypographyProps={{ fontWeight: 600 }}
      />
      <CardContent sx={{ maxHeight: 100, p: 2 }}>
        <Typography>{props.context}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={() => props.onClick}>
          {props.btnLabel || "Action"}
        </Button>
      </CardActions>
    </Card>
  );
};
