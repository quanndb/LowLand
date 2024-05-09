import { Container } from "@mui/material";
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
      {children}
      <Footer />
    </Container>
  );
};

export default DefaultLayout;
