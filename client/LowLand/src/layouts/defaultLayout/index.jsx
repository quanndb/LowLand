import { Box, Container, Typography } from "@mui/material";
import { Suspense, lazy } from "react";
import Loading from "src/components/Loading";
import LowLandLogo from "src/components/navigation/logo";

const Header = lazy(() => import("./header"));
const Footer = lazy(() => import("./footer"));

const LoginHeader = () => {
  return (
    <Container
      maxWidth={"100%"}
      sx={{
        backgroundColor: "var(--primary-color)",
        position: "fixed",
        zIndex: 1,
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }}
    >
      <Container
        sx={{
          py: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LowLandLogo />
        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontWeight: "600",
            ml: "20px",
            fontSize: "30px",
          }}
        >
          LowLand Login
        </Typography>
      </Container>
    </Container>
  );
};

const DefaultLayout = ({ children, notShowHeader }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Container
        maxWidth="100%"
        disableGutters
        sx={{
          backgroundColor: "var(--background-color)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {!notShowHeader ? <Header /> : <LoginHeader />}
        <Box
          sx={{
            paddingTop: "100px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
        <Footer />
      </Container>
    </Suspense>
  );
};

export default DefaultLayout;
