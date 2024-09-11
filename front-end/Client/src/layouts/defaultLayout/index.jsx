import { Suspense, lazy } from "react";

import { Box, Container, Typography } from "@mui/material";

import Loading from "src/components/Loading";
import LowLandLogo from "src/components/navigation/logo";
import { useScrollToTop } from "src/hooks/use-scroll-to-top";
import FloatInOnScroll from "src/components/FloatIn";

const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("./Footer"));

const SideHeader = ({ title }) => {
  return (
    <Container
      maxWidth={"100%"}
      sx={{
        backgroundColor: "var(--primary-color)",
        position: "fixed",
        zIndex: 1000,
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
          LowLand {title}
        </Typography>
      </Container>
    </Container>
  );
};

const DefaultLayout = ({ children, notShowHeader, title }) => {
  useScrollToTop();
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "var(--background-color)",
            height: "100%",
            minHeight: "100vh",
          }}
        >
          {!notShowHeader ? <Header /> : <SideHeader title={title} />}
          <Container
            disableGutters
            maxWidth={"100%"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "100px",
            }}
          >
            {children}
          </Container>
          <FloatInOnScroll>
            <Footer />
          </FloatInOnScroll>
        </Box>
      </Container>
    </Suspense>
  );
};

export default DefaultLayout;
