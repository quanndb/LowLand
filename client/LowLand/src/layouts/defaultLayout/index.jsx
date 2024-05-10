import { Box, Container } from "@mui/material";
import Header from "./header";
import Footer from "./footer";

const DefaultLayout = ({ children, notShowHeader }) => {
  return (
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
      {notShowHeader ? <></> : <Header></Header>}
      <Box sx={{ paddingTop: "100px" }}>{children}</Box>
      <Footer />
    </Container>
  );
};

export default DefaultLayout;
