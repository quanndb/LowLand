import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const SubcribeForm = () => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--primary-color)",
        width: "100%",
        height: "100%",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 0px",
        marginBottom: "30px",
        textAlign: "center",
      }}
    >
      <Typography variant="caption" sx={{ opacity: "0.6" }}>
        SIGN UP AND GET FREE COFFEE BAGS
      </Typography>
      <Typography sx={{ fontSize: "30px", margin: "15px 0px 20px" }}>
        Coffee Updates
      </Typography>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px 20px",
          display: "flex",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;",
        }}
      >
        <TextField
          label="youremail@lowlandcoffee.com"
          variant="outlined"
          color="info"
          sx={{ zIndex: 0 }}
        />
        <Button
          color="secondary"
          variant="contained"
          sx={{ marginLeft: "10px" }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

const ContactFooter = () => {
  return (
    <Container
      sx={{
        backgroundColor: "#fff",
        padding: "20px ",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;",
      }}
    >
      <Grid container spacing={5} justifyContent={"center"}>
        <Grid item sx={{ margin: "10px" }}>
          <Box
            sx={{
              backgroundImage: `url("/static/images/logo.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "120px",
              width: "120px",
              margin: "auto",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              marginBottom: "10px",
            }}
          />
          <Typography sx={{ fontWeight: "700" }}>
            LowLand Coffee &copy;
          </Typography>
        </Grid>
        <Grid item sx={{ margin: "10px" }}>
          <Typography
            sx={{
              width: "200px",
              fontWeight: "600",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            "Delivering the best coffee life since 1996. From coffee geeks to
            the real ones."
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>MENU</Typography>
          <Button>Home</Button>
          <Button>Our Products</Button>
          <Button>Blog</Button>
          <Button>About</Button>
          <Button>Contact</Button>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>CONTACT US</Typography>
          <Button>lowland@coffee.io</Button>
          <Button>(+84) 892.809.999</Button>
        </Grid>
      </Grid>

      <Divider sx={{ margin: "10px 0px" }} />
      <Typography sx={{ textAlign: "center", margin: "20px" }}>
        Powered by{" "}
        <Typography
          sx={{ color: "var(--secondary-color)" }}
          component={"a"}
          href="/"
        >
          Group 8
        </Typography>
      </Typography>
    </Container>
  );
};

const Footer = () => {
  return (
    <Container disableGutters>
      <SubcribeForm />
      <ContactFooter />
    </Container>
  );
};

export default Footer;
