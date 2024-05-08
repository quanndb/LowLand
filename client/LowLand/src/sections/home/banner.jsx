import { Box, Button, Container, Typography } from "@mui/material";

const HomeBanner = () => {
  return (
    <Container disableGutters>
      <Container
        sx={{
          backgroundImage: `linear-gradient(180deg, rgba(5, 8, 39, 0.4), rgba(5, 8, 39, 0.4)), url("https://assets.website-files.com/5be96251aaba7a7b19ecdf69/5be96251aaba7a58aaecdfba_Header-Pic.jpg")`,
          height: "530px",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat,",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "800px",
          }}
        >
          <Typography
            sx={{ marginBottom: "20px", fontWeight: "600", opacity: "0.8" }}
          >
            BEST PLACE FOR CHILL'IN
          </Typography>
          <Typography
            sx={{ fontSize: "40px", fontWeight: "700", marginBottom: "20px" }}
          >
            LowLand Coffee
          </Typography>
          <Typography
            noWrap={false}
            sx={{ textAlign: "center", marginBottom: "20px" }}
          >
            Step into a world where each sip of coffee is a delightful journey,
            where flavors dance on your palate and every cup holds the promise
            of a new adventure, only at our coffee haven.
          </Typography>
          <Button
            sx={{
              backgroundColor: "#fff",
              padding: "10px",
              "&:hover": {
                backgroundColor: "#ccc",
              },
            }}
          >
            EXPLORE OUR PRODUCTS
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default HomeBanner;
