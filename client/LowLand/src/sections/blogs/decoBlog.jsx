import { Box, Container, Typography } from "@mui/material";

const DecoBlog = () => {
  return (
    <Container
      disableGutters
      sx={{
        textAlign: "center",
        padding: "200px 0px",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ width: "60%", margin: "auto" }}>
        <Typography
          variant="h1"
          sx={{ fontSize: "40px", marginBottom: "40px", fontWeight: "600" }}
        >
          Read coffee stories on our Blog
        </Typography>
        <Typography
          sx={{ opacity: "0.7", fontSize: "20px", marginBottom: "50px" }}
        >
          Step into a world where each sip of coffee is a delightful journey,
          where flavors dance on your palate and every cup holds the promise of
          a new adventure, only at our coffee haven.
        </Typography>
      </Box>
    </Container>
  );
};

export default DecoBlog;
