import { Box, Button, Container, Grid, Typography } from "@mui/material";

import LineBlog from "src/components/LineBlog";

const SectionTitle = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid var(--secondary-color)",
        marginBottom: "50px",
      }}
    >
      <Typography
        sx={{ padding: "20px 0px", fontWeight: "600", fontSize: "20px" }}
      >
        {children}
      </Typography>
    </Box>
  );
};

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
      <SectionTitle>Categories</SectionTitle>
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
      <SectionTitle>Authors</SectionTitle>
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
  return (
    <Container sx={{ marginBottom: "80px" }}>
      <Grid container spacing={6}>
        <Grid item md={8}>
          <SectionTitle>Lastest Blogs</SectionTitle>
          <LineBlog
            url={"/blogs/1"}
            imageURL={"/static/images/blog1.jpg"}
            title={
              "Recent research suggests that heavy coffee drinkers may reap health benefits."
            }
            description={
              "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
            }
            date={"october 9, 2018"}
          />
          <LineBlog
            url={"/blogs/2"}
            imageURL={"/static/images/blog2.jpg"}
            title={
              "Recent research suggests that heavy coffee drinkers may reap health benefits."
            }
            description={
              "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
            }
            date={"october 9, 2018"}
          />
          <LineBlog
            url={"/blogs/1"}
            imageURL={"/static/images/blog3.jpg"}
            title={
              "Recent research suggests that heavy coffee drinkers may reap health benefits."
            }
            description={
              "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
            }
            date={"october 9, 2018"}
          />
          <LineBlog
            url={"/blogs/2"}
            imageURL={"/static/images/blog1.jpg"}
            title={
              "Recent research suggests that heavy coffee drinkers may reap health benefits."
            }
            description={
              "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
            }
            date={"october 9, 2018"}
          />
          <LineBlog
            url={"/blogs/1"}
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
        <Grid item md={4}>
          <SectionTitle>About Us</SectionTitle>

          <DetailStore />
          <BlogCategories />
          <Authors />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogMenu;
