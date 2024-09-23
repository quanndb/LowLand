import { Box, Container, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import BlogItem from "src/components/BlogItem";
import SectionTitle from "src/components/SectionTitle";
import { useResponsive } from "src/hooks/use-responsive";
import { BlogItemSkeleton } from "../detail-blog/FutherReading";
import blogAPI from "src/services/API/blogAPI";
import ButtonLink from "src/components/ButtonLink";

const HomeBlog = () => {
  const isMobile = useResponsive("down", 900);

  const { data: blogsPage } = useQuery({
    queryKey: ["blogs", { size: 3, isActive: true, sortedBy: "views" }],
    queryFn: () =>
      blogAPI.getBlogs({
        size: 3,
        isActive: true,
        sortedBy: "views",
      }),
  });

  return (
    <Container sx={{ marginBottom: "100px" }}>
      <SectionTitle>BEHIND THE MUGS, LIFESTYLE STORIES</SectionTitle>

      <Grid
        container
        spacing={2}
        direction={"row"}
        justifyContent={"center"}
        wrap="wrap"
        sx={{
          textAlign: `${isMobile ? "center" : "left"}`,
        }}
      >
        {blogsPage
          ? blogsPage.response.map((blog) => (
              <Grid item lg={4} md={6} xs={12} key={blog.blogId}>
                <BlogItem
                  key={blog.blogId}
                  url={`/blogs/${blog?.blogId}`}
                  imageURL={blog.imageURL}
                  title={blog.title}
                  description={blog.description}
                  date={blog.date}
                  sx={{ height: "100%" }}
                />
              </Grid>
            ))
          : [...Array(3)].map((_, i) => (
              <Grid item lg={4} md={6} xs={12} key={i}>
                <BlogItemSkeleton />
              </Grid>
            ))}
      </Grid>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}
      >
        <ButtonLink href={"/blogs"} variant={"contained"} sx={{ width: "50%" }}>
          Read more blogs
        </ButtonLink>
      </Box>
    </Container>
  );
};

export default HomeBlog;
