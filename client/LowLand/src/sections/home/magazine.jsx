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
import { useRouter } from "src/routes/hooks";

const HomeMagazine = () => {
  const router = useRouter();

  const isMobile = useResponsive("down", 900);

  const isLessMobile = useResponsive("down", 600);

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

            <Button
              variant="contained"
              sx={{ margin: "10px" }}
              onClick={() => router.replace("/products")}
            >
              START SHOPPING
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          md={1}
          sx={{
            display: "flex",
            flexWrap: `${isLessMobile ? "wrap" : "nowrap"}`,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundImage: "url(/static/images/magazine1.jpg)",
              height: "280px",
              width: `${isLessMobile ? "100%" : "280px"}`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: `${isLessMobile ? "row" : "column"}`,
              paddingLeft: `${isLessMobile ? "0px" : "20px"}`,
            }}
          >
            <Box
              sx={{
                backgroundImage: "url(/static/images/magazine2.jpg)",
                height: "130px",
                width: "110px",
                backgroundPosition: "center",
                backgroundSize: "cover",
                margin: `${isLessMobile ? "20px" : "0px"} 20px 0px 0px`,
              }}
            />
            <Box
              sx={{
                backgroundImage: "url(/static/images/magazine3.jpg)",
                height: "130px",
                width: "110px",
                backgroundPosition: "center",
                backgroundSize: "cover",
                margin: "20px 0px 0px 0px",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeMagazine;
