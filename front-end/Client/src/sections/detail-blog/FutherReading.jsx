import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { Box, Button, Card, Skeleton } from "@mui/material";

import BlogItem from "src/components/BlogItem";
import { useRouter } from "src/routes/hooks";
import { useQuery } from "@tanstack/react-query";
import blogAPI from "src/services/API/blogAPI";

export const BlogItemSkeleton = () => {
  return (
    <Card sx={{ p: 3 }}>
      <Skeleton sx={{ height: "200px", width: "100%" }} variant="rounded" />
      <Skeleton
        sx={{
          height: "20px",
          width: Math.random() * (100 - 60) + 60 + "%",
          mt: "10px",
        }}
        variant="rounded"
      />
      <Skeleton
        sx={{ height: "80px", width: "100%", mt: "10px" }}
        variant="rounded"
      />
    </Card>
  );
};

const FutherReading = () => {
  const router = useRouter();

  const { data: blogsPage } = useQuery({
    queryKey: ["blogs", { size: 4, isActive: true, sortedBy: "views" }],
    queryFn: () =>
      blogAPI.getBlogs({
        size: 4,
        isActive: true,
        sortedBy: "views",
      }),
    refetchOnWindowFocus: false,
  });
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
        spaceBetween={32}
        style={{ paddingBottom: "30px" }}
      >
        {blogsPage
          ? blogsPage.response.map((blog, index) => (
              <SwiperSlide
                key={index}
                style={{
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <BlogItem
                  url={`/blogs/${blog?.blogId}`}
                  imageURL={blog?.imageURL}
                  title={blog?.title}
                  description={blog?.description}
                  date={blog?.date}
                  sx={{ height: "100%" }}
                />
              </SwiperSlide>
            ))
          : [...Array(4)].map((_, index) => (
              <SwiperSlide key={index}>
                <BlogItemSkeleton />
              </SwiperSlide>
            ))}
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
