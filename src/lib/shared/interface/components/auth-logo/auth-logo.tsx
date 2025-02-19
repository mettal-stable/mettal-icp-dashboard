import logo from "@assets/imgs/logo.png";
import { Box } from "@mui/material";

export interface AuthLogoProps {
  iconSize?: string | number;
  textSize?: string | number;
}
export const AuthLogo: React.FC<AuthLogoProps> = (props) => {
  return (
    <Box
      sx={{
        mb: 4,
        gap: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <img src={logo} alt="logo" width={props.iconSize || 200} />
      {/* <Typography
        sx={{
          mt: 1,
          fontWeight: 600,
          letterSpacing: -0.5,
          fontFamily: "Zain",
          fontSize: props.textSize,
          color: theme.palette.secondary.main,
        }}
      >
        Mettal
      </Typography> */}
    </Box>
  );
};
