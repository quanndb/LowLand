import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import SectionTitle from "src/components/SectionTitle";
import { useResponsive } from "src/hooks/use-responsive";

const HomeMagazine = () => {
  const isMobile = useResponsive("down", 900);
  return (
    <Container maxWidth={"md"} sx={{ marginBottom: "100px" }}>
      <SectionTitle>BUY 2 MUGS AND GET A COFFEE MAGAZINE FREE</SectionTitle>
      <Grid
        container
        justifyContent={"center"}
        columns={{ md: 2 }}
        spacing={4}
        flexWrap={"wrap-reverse"}
        alignItems={"center"}
      >
        <Grid item md={1} height={"100%"}>
          <Box
            sx={{
              textAlign: `${isMobile ? "center" : "left"}`,
              display: "flex",
              flexDirection: "column",
              alignItems: `${isMobile ? "center" : "start"}`,
            }}
          >
            <Typography sx={{ margin: "10px" }}>PREMIUM OFFER</Typography>
            <Typography
              sx={{ fontWeight: "600", fontSize: "30px", margin: "10px" }}
            >
              Get our Coffee Magazine
            </Typography>
            <Typography sx={{ margin: "10px" }}>
              The most versatile furniture system ever created. Designed to fit
              your life.
            </Typography>

            <Button variant="contained" sx={{ margin: "10px" }}>
              START SHOPPING
            </Button>
          </Box>
        </Grid>
        <Grid item md={1} sx={{ display: "flex" }}>
          <Box
            sx={{
              backgroundImage: "url(static/images/magazine1.jpg)",
              height: "280px",
              width: "280px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              marginRight: "20px",
            }}
          />
          <div>
            <Box
              sx={{
                backgroundImage: "url(static/images/magazine2.jpg)",
                height: "130px",
                width: "160px",
                marginBottom: "20px",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <Box
              sx={{
                backgroundImage: "url(static/images/magazine3.jpg)",
                height: "130px",
                width: "160px",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeMagazine;
