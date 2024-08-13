import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { Box, Button } from "@mui/material";

import BlogItem from "src/components/BlogItem";
import { useRouter } from "src/routes/hooks";

const FutherReading = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        marginBottom: "100px",
      }}
    >
      <Swiper
        pagination={{
          clickable: true,
        }}
        slidesPerView={2}
        modules={[Pagination]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        style={{ paddingBottom: "50px" }}
      >
        <SwiperSlide>
          <BlogItem
            url={"/blogs/2"}
            imageURL={"/static/images/blog1.jpg"}
            title={"How long does a cup of coffee keep you awake?"}
            description={
              "It is a paradisematic country, in which roasted parts. Vel qui et ad voluptatem."
            }
            date={"November 12, 2018"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem
            url={"/blogs/2"}
            imageURL={"/static/images/blog2.jpg"}
            title={"How to make a nice coffee?"}
            description={
              "It is a paradisematic country, in which roasted parts. Vel qui et ad voluptatem."
            }
            date={"November 12, 2024"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BlogItem
            url={"/blogs/2"}
            imageURL={"/static/images/blog1.jpg"}
            title={"How long does a cup of coffee keep you awake?"}
            description={
              "It is a paradisematic country, in which roasted parts. Vel qui et ad voluptatem."
            }
            date={"November 18, 2023"}
          />
        </SwiperSlide>
      </Swiper>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ p: "10px 20px" }}
          onClick={() => router.replace("/blogs")}
        >
          VIEW ALL ARTICLES
        </Button>
      </Box>
    </Box>
  );
};

export default FutherReading;
