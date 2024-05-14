import { Box, Container, Typography } from "@mui/material";
import FeaturedPosts from "../featuredPosts";
import DecoComp from "src/components/DecoComp";
import BlogMenu from "../blogMenu";

const OwnerMotto = () => {
  return (
    <Container>
      <Box
        sx={{
          borderLeft: "2px solid #a25f4b39",
          borderBottom: "2px solid #a25f4b39",
          mb: "35px",
        }}
      >
        <Typography
          sx={{
            padding: "30px",
            fontSize: "20px",
            textAlign: "center",
            color: "var(--secondary-color)",
          }}
        >
          "I wake up some mornings and sit and have my coffee and look out at my
          beautiful garden, and I go, ’Remember how good this is. Because you
          can lose it."
        </Typography>
      </Box>
      <Typography
        sx={{ textAlign: "center", opacity: "0.4", fontWeight: "600" }}
      >
        QUAN VU - OWNER OF LOWLAND
      </Typography>
    </Container>
  );
};

const BlogsView = () => {
  return (
    <Box sx={{ height: "fit-content" }}>
      <DecoComp
        title={"Read coffee stories on our Blog"}
        desciption={`Step into a world where each sip of coffee is a delightful journey,
          where flavors dance on your palate and every cup holds the promise of
          a new adventure, only at our coffee haven.`}
      >
        <FeaturedPosts />
        <BlogMenu />
        <OwnerMotto />
      </DecoComp>
    </Box>
  );
};

export default BlogsView;
