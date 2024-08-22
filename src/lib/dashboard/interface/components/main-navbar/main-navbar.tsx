import { AuthContext } from "@auth/interface/providers/auth.provider";
import CodeIcon from "@mui/icons-material/Code";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";

const pages = [
  {
    label: "Home",
    icon: <HomeIcon fontSize="small" />,
    path: "/",
  },
  {
    label: "Merchant Payments",
    icon: <ReceiptLongIcon fontSize="small" />,
    path: "/merchants",
  },
  {
    label: "Blockchain Addresses",
    icon: <LinkIcon fontSize="small" />,
    path: "/addresses",
  },
  { label: "APIS", icon: <CodeIcon fontSize="small" />, path: "/apis" },
];

export const MainNavbar = () => {
  const { auth, login, logout } = useContext<any>(AuthContext);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontFamily: "Poppins", mr: 3 }}
          >
            {import.meta.env.VITE_COMPANY_SHORT_NAME}
            <Chip
              color="secondary"
              size="small"
              label={import.meta.env.MODE}
              sx={{ mt: -0.5, fontSize: "0.7rem" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: any) => (
              <Button
                startIcon={page.icon}
                key={page.label}
                onClick={() => {}}
                size="small"
                sx={{ color: "white", mr: 1 }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {auth ? (
            <Button
              color="inherit"
              onClick={() => {
                logout();
              }}
            >
              logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                login();
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
