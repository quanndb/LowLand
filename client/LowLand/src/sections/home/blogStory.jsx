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
        spacing={4}
        direction={"row"}
        justifyContent={"center"}
        wrap="wrap"
        sx={{
          textAlign: `${isMobile ? "center" : "left"}`,
        }}
      >
        <Grid item md={4}>
          <BlogItem
            url={"/blogs"}
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
        <Grid item md={4}>
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
        <Grid item md={4}>
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
