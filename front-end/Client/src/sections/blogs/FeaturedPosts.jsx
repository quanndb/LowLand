import { Box, Card, Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import BlogItem from "src/components/BlogItem";
import SectionTitle from "src/components/SectionTitle";
import blogAPI from "src/services/API/blogAPI";

const FeaturedPostsSkeleton = () => {
  return (
    <>
      <Grid item md={6} xs={12}>
        <Card sx={{ p: 3 }}>
          <Skeleton sx={{ height: "200px", width: "100%" }} variant="rounded" />
          <Skeleton
            sx={{ height: "20px", width: "100%", mt: "10px" }}
            variant="rounded"
          />
          <Skeleton
            sx={{ height: "80px", width: "100%", mt: "10px" }}
            variant="rounded"
          />
        </Card>
      </Grid>
      <Grid item md={6} xs={12}>
        <Card sx={{ p: 3 }}>
          <Skeleton sx={{ height: "200px", width: "100%" }} variant="rounded" />
          <Skeleton
            sx={{ height: "20px", width: "100%", mt: "10px" }}
            variant="rounded"
          />
          <Skeleton
            sx={{ height: "80px", width: "100%", mt: "10px" }}
            variant="rounded"
          />
        </Card>
      </Grid>
    </>
  );
};

const FeaturedPosts = () => {
  const { data: blogsPage } = useQuery({
    queryKey: ["blogs", { size: 2 }],
    queryFn: () =>
      blogAPI.getBlogs({
        size: 2,
        isActive: true,
      }),
  });

  return (
    <Box
      sx={{
        marginBottom: "60px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SectionTitle>Featured Posts</SectionTitle>
      <Grid
        container
        spacing={4}
        justifyContent={"center"}
        sx={{ width: "100%" }}
      >
        {blogsPage ? (
          <>
            {blogsPage.response.map((blog, index) => (
              <Grid item md={6} key={index} sx={{ width: "100%" }}>
                <BlogItem
                  url={`/blogs/${blog?.blogId}`}
                  imageURL={blog.imageURL}
                  title={blog.title}
                  description={blog.description}
                  date={blog.date}
                  sx={{ height: "100%" }}
                />
              </Grid>
            ))}
          </>
        ) : (
          <FeaturedPostsSkeleton />
        )}
      </Grid>
    </Box>
  );
};

export default FeaturedPosts;
