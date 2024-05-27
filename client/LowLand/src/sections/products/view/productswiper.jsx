import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper/modules";

import { Container, Button, Grid, Typography, Box } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useResponsive } from "src/hooks/use-responsive";

import Image from "src/components/Image";

const SwiperBtn = () => {
  const swiper = useSwiper();
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        top: "50%",
        zIndex: 1,
      }}
    >
      <IconButton
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton onClick={() => swiper.slideNext()}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

const Productswiper = () => {
  const isMobile = useResponsive("down", 900);

  return (
    <>
      <Swiper
        style={{ position: "relative", width: "100%", marginBottom: "100px" }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Grid
            container
            sx={{ width: "100%", padding: "40px" }}
            columns={{ md: 2, sm: 1 }}
          >
            <Grid item md={1} width={"100%"} height={"300px"}>
              <Image
                imageURL={"/static/images/ourproduct1.jpg"}
                sx={{ width: "100%", height: "310px" }}
                overlayContent={"ABC"}
              />
            </Grid>
            <Grid
              item
              sx={{
                marginBottom: "20px",
                padding: "30px",
              }}
              md={1}
            >
              <Container
                sx={{
                  textAlign: `${isMobile ? "center" : "left"}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: `${isMobile ? "center" : "start"}`,
                }}
              >
                <Typography sx={{ mb: "20px" }}>NEW STORE OPENED</Typography>
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  sx={{ mb: "20px" }}
                >
                  We're in London
                </Typography>
                <Typography sx={{ wordWrap: "break-word", mb: "20px" }}>
                  Even the all-powerful Pointing has no control about the blind
                  texts it is an almost unorthographic life.
                </Typography>

                <Button variant="contained" sx={{ padding: "15px 25px" }}>
                  READ THE FULL STORY
                </Button>
              </Container>
            </Grid>
          </Grid>
        </SwiperSlide>
        <SwiperSlide>
          <Grid
            container
            sx={{ width: "100%", padding: "40px" }}
            columns={{ md: 2, sm: 1 }}
          >
            <Grid item md={1} width={"100%"} height={"300px"}>
              <Image
                imageURL={"/static/images/ourproduct2.jpg"}
                sx={{ width: "100%", height: "310px" }}
              />
            </Grid>
            <Grid
              item
              sx={{
                marginBottom: "20px",
                padding: "30px",
              }}
              md={1}
            >
              <Container
                sx={{
                  textAlign: `${isMobile ? "center" : "left"}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: `${isMobile ? "center" : "start"}`,
                }}
              >
                <Typography sx={{ mb: "20px" }}>NEW ARTICLE IS LIVE</Typography>
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  sx={{ mb: "20px" }}
                >
                  Health Check: why do I get a headache when I haven’t had my
                  coffee?
                </Typography>
                <Typography sx={{ wordWrap: "break-word", mb: "20px" }}>
                  It is a paradisematic country, in which roasted parts of
                  sentences fly into your mouth.
                </Typography>

                <Button variant="contained" sx={{ padding: "15px 25px" }}>
                  READ THE FULL STORY
                </Button>
              </Container>
            </Grid>
          </Grid>
        </SwiperSlide>

        {isMobile ? <></> : <SwiperBtn />}
      </Swiper>
    </>
  );
};
export default Productswiper;
