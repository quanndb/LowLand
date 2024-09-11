import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import BlogMenuSkeleton from "src/components/BlogMenuSkeleton";

import LineBlog from "src/components/LineBlog";
import SectionTitleB from "src/components/SectionTitleB";
import blogAPI from "src/services/API/blogAPI";

const Category = ({ children, imgURL }) => {
  return (
    <Button
      color="secondary"
      sx={{
        width: "100%",
        borderLeft: "1px solid var(--secondary-color)",
        display: "flex",
        alignItems: "center",
        py: "10px",
        justifyContent: "left",
        my: "10px",
      }}
    >
      {imgURL ? (
        <Box
          sx={{
            width: "60px",
            height: "60px",
            backgroundImage: `url("${imgURL}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            ml: "10px",
          }}
        />
      ) : (
        <></>
      )}
      <Typography
        sx={{ ml: "20px", color: "var(--primary-color)", opacity: "0.7" }}
      >
        {children}
      </Typography>
    </Button>
  );
};

const BlogCategories = () => {
  return (
    <Box>
      <SectionTitleB>Categories</SectionTitleB>
      <Category>Barista</Category>
      <Category>Coffee</Category>
      <Category>Lifestyle</Category>
      <Category>Mugs</Category>
      <Category>Tea</Category>
    </Box>
  );
};

const Authors = () => {
  return (
    <Box>
      <SectionTitleB>Authors</SectionTitleB>
      <Category imgURL={"/static/images/logo.jpg"}>Vu Minh Quan</Category>
      <Category imgURL={"/static/images/logo.jpg"}>Nguyen Anh Quan</Category>
      <Category imgURL={"/static/images/logo.jpg"}>Le Minh Khoi</Category>
      <Category imgURL={"/static/images/logo.jpg"}>Ha Van Sang</Category>
    </Box>
  );
};

const DetailStore = () => {
  return (
    <Box sx={{ mb: "15px" }}>
      <Typography sx={{ fontWeight: "600", mb: "10px" }}>LowLand.</Typography>
      <Typography sx={{ mb: "10px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        varius enim in eros elementum tristique.
      </Typography>
      <Button
        color={"secondary"}
        sx={{
          textDecoration: "underline",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Read the full story
      </Button>
    </Box>
  );
};

const BlogMenu = () => {
  const { data: blogsPage } = useQuery({
    queryKey: ["blogs", { size: 4 }],
    queryFn: () =>
      blogAPI.getBlogs({
        size: 4,
        isActive: true,
      }),
  });

  return (
    <Container
      sx={{ marginBottom: "80px", justifyContent: "center", display: "flex" }}
    >
      <Grid
        container
        spacing={6}
        justifyContent={"center"}
        sx={{ width: "100%" }}
      >
        <Grid item md={8} xs={12}>
          <SectionTitleB>Lastest Blogs</SectionTitleB>
          {blogsPage ? (
            blogsPage.response.map((blog) => (
              <LineBlog
                key={blog.blogId}
                url={`/blogs/${blog?.blogId}`}
                imageURL={blog.imageURL}
                title={blog.title}
                description={blog.description}
                date={blog.date}
              />
            ))
          ) : (
            <BlogMenuSkeleton />
          )}
        </Grid>
        <Grid item md={4}>
          <SectionTitleB>About Us</SectionTitleB>
          <DetailStore />
          <BlogCategories />
          <Authors />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogMenu;
