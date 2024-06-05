import { useLoaderData } from "react-router-dom";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Container } from "@mui/material";
import IntroText from "src/components/IntroText";
import { useRouter } from "src/routes/hooks";
import Image from "src/components/Image";

import FutherReading from "../FutherReading";
import BLogContent from "../BlogContent";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});
const CustomizedBreadcrumbs = ({ sx, title }) => {
  const router = useRouter();
  function handleClick(event) {
    event.preventDefault();
    console.log(event);
  }
  return (
    <Box role="presentation" onClick={handleClick} sx={{ ...sx }}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb component="a" href="#" label="Blogs" />
        <StyledBreadcrumb
          component="a"
          href="#"
          sx={{ maxWidth: "150px" }}
          label={title}
        />
      </Breadcrumbs>
    </Box>
  );
};

const DetailBlogView = ({ blog }) => {
  return (
    <>
      <Container sx={{ mt: "40px" }} disableGutters={true}>
        <Box sx={{ p: "20px" }}>
          <CustomizedBreadcrumbs sx={{ mb: "40px" }} title={blog.title} />
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
