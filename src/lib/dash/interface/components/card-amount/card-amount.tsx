import { InfoRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
export interface ICardAmount {
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  currency?: string;
  onClick?(): void;
  onInfoIcon?(): void;
}
export const CardAmount: React.FC<ICardAmount> = (props) => {
  const typography = {
    md: { fontFamily: "Poppins", fontSize: "3.5rem", fontWeight: 500 },
    xs: { fontFamily: "Poppins", fontSize: "1.5rem", fontWeight: 500 },
  };

  const sublabelStyles = {
    fontWeight: 300,
    fontSize: "1.2rem",
    color: "text.secondary",
  };
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #ccc",
        borderRadius: 3,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: "all 300ms ease-in",
        boxShadow: "11px 17px 60px -81px rgba(0,0,0,0.56)",
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Typography
            variant="h2"
            sx={{
              typography,
            }}
          >
            {props.label}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: "1rem",
              color: "#666",
            }}
          >
            {props.currency}
          </Typography>
        </Stack>
      </CardContent>
      <Box sx={{ bgcolor: "#f8f8f8", width: "100%", p: 2 }}>
        <Stack direction="row">
          <Typography sx={sublabelStyles}>{props.sublabel}</Typography>
          <Tooltip title={"What is this?"} placement="top">
            <IconButton
              onClick={() => {
                if (props.onInfoIcon) {
                  props.onInfoIcon();
                }
              }}
            >
              <InfoRounded
                htmlColor="#666"
                fontSize="small"
                sx={{ mt: -0.5 }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Card>
  );
};
