import React, { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

import Image from "src/components/Image";
import SectionTitle from "src/components/SectionTitle";
import Motto from "src/components/Motto";
import { BlogHeader, BlogImage, BlogLink } from "./BlogComponent";
import { usePathname } from "src/routes/hooks";
import DrawerManagerSlice from "src/redux/slices/DrawerManagerSlice";
import BlogCommentDrawer from "src/layouts/defaultLayout/common/BlogCommentDrawer";

const AuthorInfo = memo(({ author }) => {
  return (
    <Paper sx={{ p: "40px" }} elevation={4}>
      <Typography>WRITTEN BY</Typography>
      <Image
        imageURL={"/static/images/logo.jpg"}
        sx={{ height: "140px", width: "100%", my: "20px" }}
        unShowOverlay={true}
      />
      <Typography sx={{ mb: "15px", fontWeight: "bold" }}>
        {author.name}
      </Typography>
      <Typography sx={{ mb: "15px" }} variant="subtitle1">
        {author.description}
      </Typography>
      <Button variant="contained">All author's blogs</Button>
    </Paper>
  );
});

const BlogContentDisplay = memo(({ content }) => {
  const renderBlogContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "h1":
          return (
            <BlogHeader variant={"h1"} key={index}>
              {item.data}
            </BlogHeader>
          );
        case "h2":
          return (
            <BlogHeader variant={"h2"} key={index}>
              {item.data}
            </BlogHeader>
          );
        case "h3":
          return (
            <BlogHeader variant={"h3"} key={index}>
              {item.data}
            </BlogHeader>
          );
        case "h4":
          return (
            <BlogHeader variant={"h4"} key={index}>
              {item.data}
            </BlogHeader>
          );
        case "p":
          return <BlogHeader key={index}>{item.data}</BlogHeader>;
        case "link":
          return (
            <BlogLink href={item.data.href} key={index}>
              {item.data.title ? item.data.title : null}
            </BlogLink>
          );
        case "motto":
          return <Motto key={index}>{item.data}</Motto>;
        case "img":
          return (
            <BlogImage
              imageURL={item.data.url}
              alt={item.data.alt}
              key={index}
            />
          );
        default:
          return null;
      }
    });
  };
  return <>{renderBlogContent(content)}</>;
});

const BLogContent = memo(({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  const location = usePathname();
  const dispatch = useDispatch();

  const handleCopyToClipboard = () => {
    const copyText = window.location.origin + location;

    navigator.clipboard.writeText(copyText).then(
      function () {
        toast.success("Copy blog link to clipboard successfully!");
      },
      function (err) {
        toast.error("Fail to copy blog link to clipboard!");
      }
    );
  };

  const handeOpenBlogComment = () => {
    dispatch(DrawerManagerSlice.actions.setOpenBlogCommentDrawer(true));
  };

  return (
    <Paper sx={{ p: "20px", mb: "100px" }}>
      <Grid
        container
        sx={{ justifyContent: "space-between", flexWrap: "wrap-reverse" }}
        spacing={4}
      >
        <Grid item lg={3} sx={{ width: "100%" }}>
          <AuthorInfo author={data.author} />
        </Grid>
        <Grid item lg={9} sx={{ width: "100%" }}>
          <SectionTitle>{data.blog.date}</SectionTitle>
          <BlogContentDisplay content={data.blog.content} />
        </Grid>
      </Grid>

      <Divider sx={{ mt: "50px" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: "10px",
          mt: "20px",
        }}
      >
        <div>
          <IconButton onClick={() => setIsLiked(!isLiked)} sx={{ mr: "20px" }}>
            <Badge badgeContent={isLiked ? 11 : 10} color="primary">
              {isLiked ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </Badge>
          </IconButton>
          <IconButton onClick={handeOpenBlogComment}>
            <Badge badgeContent={8} color="primary">
              <ChatBubbleOutlineIcon />
            </Badge>
          </IconButton>
          <BlogCommentDrawer />
        </div>
        <IconButton onClick={handleCopyToClipboard}>
          <ShareIcon />
        </IconButton>
      </Box>
    </Paper>
  );
});

export default BLogContent;
