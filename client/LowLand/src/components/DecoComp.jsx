import { Box, Container, Typography } from "@mui/material";

const DecoComp = ({ title, desciption, children }) => {
  return (
    <>
      <Container
        disableGutters
        sx={{
          textAlign: "center",
          padding: "100px 0px 300px",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ width: "60%", margin: "auto" }}>
          <Typography
            variant="h1"
            sx={{ fontSize: "40px", marginBottom: "40px", fontWeight: "600" }}
          >
            {title}
          </Typography>
          <Typography
            sx={{ opacity: "0.7", fontSize: "20px", marginBottom: "50px" }}
          >
            {desciption}
          </Typography>
        </Box>
      </Container>
      <Container
        maxWidth={"lg"}
        sx={{ marginBottom: "100px", position: "relative", top: "-400px" }}
      >
        {children}
      </Container>
    </>
  );
};

export default DecoComp;
