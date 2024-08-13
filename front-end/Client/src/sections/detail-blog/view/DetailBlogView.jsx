import HomeIcon from "@mui/icons-material/Home";
import { Box, Container } from "@mui/material";

import IntroText from "src/components/IntroText";
import Image from "src/components/Image";

import FutherReading from "../FutherReading";
import BLogContent from "../BlogContent";
import {
  BreadcrumItem,
  CustomizedBreadcrumbs,
} from "src/components/CustomBreadcum";

const DetailBlogView = ({ blog }) => {
  return (
    <>
      <Container sx={{ mt: "40px" }} disableGutters={true}>
        <Box sx={{ p: "20px" }}>
          <CustomizedBreadcrumbs sx={{ mb: "40px" }}>
            <BreadcrumItem
              icon={<HomeIcon />}
              label={"Home"}
              href={"/"}
              component={"a"}
            />
            <BreadcrumItem label={"Blog"} href={"/blogs"} component={"a"} />
            <BreadcrumItem
              label={blog.title}
              href={`/blogs/${blog.id}`}
              component={"a"}
            />
          </CustomizedBreadcrumbs>
          <IntroText
            variant={"h1"}
            title={blog.title}
            desciption={blog.description}
            sx={{ maxWidth: "800px", textAlign: "left" }}
          />
        </Box>
        <Image
          imageURL={blog.imageURL}
          sx={{ width: "100%", height: "450px" }}
          unShowOverlay={true}
        />
        <BLogContent data={blog.data} />
        <FutherReading />
      </Container>
    </>
  );
};

export default DetailBlogView;
