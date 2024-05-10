import { Box, Container } from "@mui/material";
import DecoBlog from "../decoBlog";
import FeaturedPosts from "../featuredPosts";

const BlogsView = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <DecoBlog />

      <FeaturedPosts />
    </Box>
  );
};

export default BlogsView;
