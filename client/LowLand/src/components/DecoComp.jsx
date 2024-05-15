import { Box, Container, Typography } from "@mui/material";
import IntroText from "./IntroText";

const DecoComp = ({ title, desciption, children, sx, space }) => {
  return (
    <>
      <Container
        disableGutters
        sx={{
          textAlign: "center",
          padding: "150px 0px",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ width: "60%", margin: "auto" }}>
          <IntroText title={title} desciption={desciption} />
        </Box>
      </Container>
      <Container
        maxWidth={"lg"}
        sx={{
          transform: `translateY(-${space}px)`,
          mb: `-${space - 100}px`,
          ...sx,
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default DecoComp;
