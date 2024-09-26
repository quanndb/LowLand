import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Container,
  Button,
  Grid,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useResponsive } from "src/hooks/use-responsive";

import Image from "src/components/Image";
import { useRouter } from "src/routes/hooks";
import { useQuery } from "@tanstack/react-query";
import blogAPI from "src/services/API/blogAPI";

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
  const router = useRouter();

  const { data: blogsPage } = useQuery({
    queryKey: ["blogs", { size: 2, categoryName: "Store stories" }],
    queryFn: () =>
      blogAPI.getBlogs({
        size: 4,
        isActive: true,
        categoryName: "Store stories",
      }),
  });

  return (
    <>
      {blogsPage ? (
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "5px",
            marginBottom: "100px",
          }}
        >
          <>
            {blogsPage.response.map((blog) => (
              <SwiperSlide
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                key={blog.blogId}
              >
                <Grid
                  container
                  sx={{ width: "100%", padding: { md: "0px 40px", sm: "0px" } }}
                  columns={{ md: 2, sm: 1 }}
                  onClick={() => router.push(`/blogs/${blog.blogId}`)}
                >
                  <Grid item md={1} width={"100%"} height={"300px"}>
                    <Image
                      imageURL={blog.imageURL}
                      sx={{ width: "100%", height: "310px" }}
                      overlayContent={"READ THE FULL STORY"}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginBottom: "30px",
                      alignItems: `${isMobile ? "center" : "start"}`,
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
                      <Typography
                        sx={{ mb: "20px", mt: { md: "0px", sm: "20px" } }}
                      >
                        {blog.categoryName}
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ mb: "20px" }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography sx={{ wordWrap: "break-word", mb: "20px" }}>
                        {blog.description}
                      </Typography>

                      <Button variant="contained" sx={{ padding: "15px 25px" }}>
                        READ THE FULL STORY
                      </Button>
                    </Container>
                  </Grid>
                </Grid>
              </SwiperSlide>
            ))}
          </>
          {isMobile ? <></> : <SwiperBtn />}
        </Swiper>
      ) : (
        <Grid
          container
          sx={{
            width: "100%",
            padding: { md: "0px 40px", sm: "0px" },
            mb: "100px",
          }}
          columns={{ md: 2, sm: 1 }}
        >
          <Grid item md={1} width={"100%"} height={"300px"}>
            <Skeleton
              sx={{ width: "100%", height: "310px" }}
              variant="rounded"
            />
          </Grid>
          <Grid
            item
            sx={{
              marginBottom: "20px",
              alignItems: `${isMobile ? "center" : "start"}`,
              width: "100%",
            }}
            md={1}
          >
            <Container
              sx={{
                textAlign: `${isMobile ? "center" : "left"}`,
                display: "flex",
                flexDirection: "column",
                alignItems: `${isMobile ? "center" : "start"}`,
                mt: "20px",
                ml: {
                  md: "20px",
                  sm: "0px",
                },
              }}
              disableGutters
            >
              <Skeleton
                sx={{ mb: "20px" }}
                variant="text"
                width={"100%"}
                height={40}
              />
              <Skeleton
                sx={{ mb: "20px" }}
                variant="text"
                width={"100%"}
                height={60}
              />
              <Skeleton
                sx={{ mb: "20px" }}
                variant="text"
                width={"100%"}
                height={100}
              />

              <Skeleton variant="contained" sx={{ padding: "15px 50px" }} />
            </Container>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default Productswiper;
