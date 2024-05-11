import { Box, Container } from "@mui/material";
import FeaturedPosts from "../featuredPosts";
import DecoComp from "src/components/DecoComp";

const BlogsView = () => {
  return (
    <Box>
      <DecoComp
        title={"Read coffee stories on our Blog"}
        desciption={`Step into a world where each sip of coffee is a delightful journey,
          where flavors dance on your palate and every cup holds the promise of
          a new adventure, only at our coffee haven.`}
      >
        <FeaturedPosts />
      </DecoComp>
    </Box>
  );
};

export default BlogsView;
