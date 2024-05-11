import { Box, Container, Grid, Typography } from "@mui/material";
import BlogItem from "src/components/BlogItem";
import SectionTitle from "src/components/SectionTitle";
import { useResponsive } from "src/hooks/use-responsive";

const HomeBlog = () => {
  const isMobile = useResponsive("down", 900);
  return (
    <Container sx={{ marginBottom: "100px" }}>
      <SectionTitle>BEHIND THE MUGS, LIFESTYLE STORIES</SectionTitle>

      <Grid
        container
        spacing={1}
        direction={"row"}
        justifyContent={"center"}
        wrap="wrap"
        sx={{
          textAlign: `${isMobile ? "center" : "left"}`,
        }}
      >
        <Grid item lg={4} md={6} sm={12}>
          <BlogItem
            url={"/blogs/123"}
            imageURL={"static/images/blog1.jpg"}
            title={
              "Health Check: why do I get a headache when I haven’t had my coffee?"
            }
            description={
              "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
            }
            date={"october 9, 2018"}
          />
        </Grid>
        <Grid item lg={4} md={6} sm={12}>
          <BlogItem
            imageURL={"static/images/blog2.jpg"}
            title={
              "Health Check: why do I get a headache when I haven’t had my coffee?"
            }
            description={
              "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
            }
            date={"october 9, 2018"}
          />
        </Grid>
        <Grid item lg={4} md={6} sm={12}>
          <BlogItem
            imageURL={"static/images/blog3.jpg"}
            title={
              "Health Check: why do I get a headache when I haven’t had my coffee?"
            }
            description={
              "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
            }
            date={"october 9, 2018"}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeBlog;
