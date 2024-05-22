import { Box, Container, Typography } from "@mui/material";
import FeaturedPosts from "../featuredPosts";
import DecoComp from "src/components/DecoComp";
import BlogMenu from "../blogMenu";
import Motto from "src/components/Motto";

const BlogsView = () => {
  return (
    <Box sx={{ height: "fit-content" }}>
      <DecoComp
        space={240}
        title={"Read coffee stories on our Blog"}
        desciption={`Step into a world where each sip of coffee is a delightful journey,
          where flavors dance on your palate and every cup holds the promise of
          a new adventure, only at our coffee haven.`}
      >
        <FeaturedPosts />
        <BlogMenu />
        <Motto author={`QUAN VU - OWNER OF LOWLAND`}>
          `"I wake up some mornings and sit and have my coffee and look out at
          my beautiful garden, and I go, ’Remember how good this is. Because you
          can lose it."
        </Motto>
      </DecoComp>
    </Box>
  );
};

export default BlogsView;
