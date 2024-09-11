import HomeIcon from "@mui/icons-material/Home";
import { Box, Container, Skeleton } from "@mui/material";

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
            label={blog ? blog.title : "Loading..."}
            href={`/blogs/${blog ? blog.id : ""}`}
            component={"a"}
          />
        </CustomizedBreadcrumbs>
        {blog ? (
          <IntroText
            variant={"h1"}
            title={blog.title}
            desciption={blog.description}
            sx={{ maxWidth: "800px", textAlign: "left" }}
          />
        ) : (
          <>
            <Skeleton variant="text" width={"80%"} height={50} />
            <Skeleton variant="text" width={"100%"} height={200} />
          </>
        )}
      </Box>
      {blog ? (
        <Image
          imageURL={blog.imageURL}
          sx={{ width: "100%", height: "450px" }}
          unShowOverlay={true}
        />
      ) : (
        <Skeleton variant="rounded" width={"100%"} height={200} />
      )}
      <BLogContent data={blog} />
      <FutherReading />
    </Container>
  );
};

export default DetailBlogView;
