import { Box } from "@mui/material";

import BlogMenu from "../BlogMenu";
import FeaturedPosts from "../FeaturedPosts";

import DecoComp from "src/components/DecoComp";
import Motto from "src/components/Motto";
import FloatInOnScroll from "src/components/FloatIn";
import AllArticle from "../AllArticle";

const BlogsView = () => {
  return (
    <Box sx={{ height: "fit-content" }}>
      <DecoComp
        space={200}
        title={"Read coffee stories on our Blog"}
        desciption={`Step into a world where each sip of coffee is a delightful journey,
          where flavors dance on your palate and every cup holds the promise of
          a new adventure, only at our coffee haven.`}
      >
        <FloatInOnScroll>
          <FeaturedPosts />
        </FloatInOnScroll>

        <FloatInOnScroll>
          <BlogMenu />
        </FloatInOnScroll>

        <FloatInOnScroll>
          <AllArticle />
        </FloatInOnScroll>

        <FloatInOnScroll>
          <Motto author={`QUAN VU - OWNER OF LOWLAND`}>
            `"I wake up some mornings and sit and have my coffee and look out at
            my beautiful garden, and I go, ’Remember how good this is. Because
            you can lose it."
          </Motto>
        </FloatInOnScroll>
      </DecoComp>
    </Box>
  );
};

export default BlogsView;
