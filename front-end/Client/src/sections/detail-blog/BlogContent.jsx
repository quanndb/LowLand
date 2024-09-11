import { memo, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Email, Facebook, Twitter, Link } from "@mui/icons-material";

import { BlogHeader, BlogImage, BlogLink } from "./BlogComponent";

import DrawerManagerSlice from "src/redux/slices/DrawerManagerSlice";
import BlogCommentDrawer from "src/layouts/defaultLayout/common/BlogCommentDrawer";
import Image from "src/components/Image";
import Motto from "src/components/Motto";
import SectionTitle from "src/components/SectionTitle";
import { usePathname } from "src/routes/hooks";
import ButtonLink from "src/components/ButtonLink";

const AuthorInfo = memo(({ author }) => {
  return (
    <Paper sx={{ p: "40px" }} elevation={4}>
      <Typography>WRITTEN BY</Typography>
      <Image
        imageURL={author?.imageURL || "/static/images/logo.jpg"}
        sx={{ height: "140px", width: "100%", my: "10px" }}
        unShowOverlay={true}
      />
      {author ? (
        <>
          <Typography sx={{ mb: "5px", fontWeight: "bold" }}>
            {author.fullName}
          </Typography>
          <Typography
            sx={{
              mb: "10px",
              fontWeight: "bold",
              opacity: "0.6",
              color: "var(--secondary-color)",
              textTransform: "uppercase",
            }}
          >
            {author.position}
          </Typography>
          <Typography sx={{ mb: "15px" }}>{author.description}</Typography>
          <ButtonLink
            variant="contained"
            sx={{ width: "100%" }}
            href={`/authors/${author.accountId}/blogs`}
          >
            More blogs
          </ButtonLink>
        </>
      ) : (
        <>
          <Skeleton variant="text" />
          <Skeleton variant="text" height={50} />
          <Skeleton variant="text" height={100} />
        </>
      )}
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
            <BlogLink href={item.data} key={index}>
              {item?.title ? item.title : null}
            </BlogLink>
          );
        case "motto":
          return <Motto key={index}>{item.data}</Motto>;
        case "img":
          return (
            <BlogImage imageURL={item.data} alt={item.title} key={index} />
          );
        default:
          return null;
      }
    });
  };
  return <>{renderBlogContent(content)}</>;
});

const ShareDialog = ({ open, onClose }) => {
  const location = usePathname();
  const url = window.location.origin + location;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share this blog with everyone!</DialogTitle>
      <DialogContent>
        <TextField
          label="Link"
          value={url}
          fullWidth
          sx={{ mt: "20px" }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleCopyLink}>
                <ContentCopyIcon />
              </IconButton>
            ),
          }}
        />
        {copied && (
          <Typography style={{ color: "green" }}>
            Link copied to clipboard!
          </Typography>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          {/* Share via Email */}
          <IconButton
            component="a"
            href={`mailto:?subject=Check out this blog&body=${url}`}
            target="_blank"
            color="primary"
          >
            <Email />
          </IconButton>

          {/* Share via Facebook */}
          <IconButton
            component="a"
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            color="primary"
          >
            <Facebook />
          </IconButton>

          {/* Share via Twitter */}
          <IconButton
            component="a"
            href={`https://twitter.com/intent/tweet?url=${url}&text=Check out this blog!`}
            target="_blank"
            color="primary"
          >
            <Twitter />
          </IconButton>

          {/* Copy Link */}
          <IconButton onClick={handleCopyLink} color="primary">
            <Link />
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const BLogContent = memo(({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const [openShare, setOpenShare] = useState(false);

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
          <AuthorInfo author={data?.author} />
        </Grid>
        <Grid item lg={9} sx={{ width: "100%" }}>
          {data ? (
            <>
              <SectionTitle>
                {new Date(data.date).toDateString() +
                  " " +
                  new Date(data.date).toLocaleTimeString()}
              </SectionTitle>
              <BlogContentDisplay content={data?.content} />
            </>
          ) : (
            <>
              <Skeleton
                variant="text"
                width={"30%"}
                height={20}
                sx={{ mx: "auto" }}
              />
              <>
                <Skeleton
                  variant="rectangular"
                  width={"70%"}
                  height={40}
                  sx={{ my: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={200}
                  sx={{ my: "5px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"60%"}
                  height={50}
                  sx={{ my: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={100}
                  sx={{ my: "10px" }}
                />
              </>
            </>
          )}
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
        <IconButton onClick={() => setOpenShare(true)} title="Copy link">
          <ShareIcon />
        </IconButton>
      </Box>

      <ShareDialog open={openShare} onClose={() => setOpenShare(false)} />
    </Paper>
  );
});

export default BLogContent;
