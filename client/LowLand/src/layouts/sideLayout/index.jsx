import { Container } from "@mui/material";

import DefaultLayout from "src/layouts/defaultLayout";

const SideLayout = ({ children, title }) => {
  return (
    <DefaultLayout title={title} notShowHeader={true}>
      <Container
        sx={{
          margin: "0px 0px",
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        {children}
      </Container>
    </DefaultLayout>
  );
};

export default SideLayout;
