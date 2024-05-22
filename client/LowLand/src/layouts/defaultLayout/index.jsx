import { Box, Container } from "@mui/material";
import { Suspense, lazy } from "react";
import Loading from "src/components/Loading";

const Header = lazy(() => import("./header"));
const Footer = lazy(() => import("./footer"));

const DefaultLayout = ({ children }) => {
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
        <Header />
        <Box sx={{ paddingTop: "100px" }}>{children}</Box>
        <Footer />
      </Container>
    </Suspense>
  );
};

export default DefaultLayout;
