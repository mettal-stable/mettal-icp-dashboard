import notFoundImage from "@assets/imgs/not-found.png";
import { Box, Button, Container, Typography } from "@mui/material";
import { ExceptionLayout } from "@shared/interface/layouts/exception.layout";
import { useNavigate } from "react-router-dom";

export const NotFoundRouteScreen = () => {
  const navigate = useNavigate();
  return (
    <ExceptionLayout>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "calc(100vw - 600px)",
          height: "calc(100vh - 300px)",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mb: 2, color: "#3F3F3F" }}>
          <Typography variant="h1">404</Typography>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Page not found
          </Typography>
        </Box>
        <img
          src={notFoundImage}
          alt="not-found"
          style={{
            opacity: 0.8,
            height: "auto",
            maxHeight: "60%",
            width: "70%",
            maxWidth: "500px",
            objectFit: "contain",
            filter: "invert(20%)",
          }}
        />
        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Go to home
          </Button>
        </Box>
      </Container>
    </ExceptionLayout>
  );
};

export default NotFoundRouteScreen;
