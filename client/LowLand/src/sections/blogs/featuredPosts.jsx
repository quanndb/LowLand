import { Box, Container, Grid } from "@mui/material";
import BlogItem from "src/components/BlogItem";
import LineBlog from "src/components/LineBlog";
import SectionTitle from "src/components/SectionTitle";

const FeaturedPosts = () => {
  return (
    <Box sx={{ marginBottom: "60px" }}>
      <SectionTitle>Featured Posts</SectionTitle>
      <Grid container spacing={4} justifyContent={"center"}>
        <Grid item md={6}>
          <BlogItem
            url={"/"}
            imageURL={"/static/images/blog1.jpg"}
            title={
              "Recent research suggests that heavy coffee drinkers may reap health benefits."
            }
            description={
              "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
            }
            date={"october 9, 2018"}
          />
        </Grid>
        <Grid item md={6}>
          <BlogItem
            url={"/"}
            imageURL={"/static/images/blog2.jpg"}
            title={
              "Recent research suggests that heavy coffee drinkers may reap health benefits."
            }
            description={
              "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
            }
            date={"october 9, 2018"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedPosts;
