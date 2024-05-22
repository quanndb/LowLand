import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

import SideDrawer from "src/components/navigation/SideDrawer";
import { blogCommentDrawer } from "src/redux/selectors/DrawerSelector";
import { useState } from "react";

const CommentItem = ({ avatarURL, name, date, like, comment }) => {
  const [isLiked, setIsLiked] = useState(like);
  return (
    <Box sx={{ my: "20px" }}>
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ mr: "10px", border: "2px solid var(--primary-color)" }}
          src={avatarURL ? avatarURL : null}
        />
        <Box>
          <Box
            sx={{
              backgroundColor: "#f2f3f5",
              p: "8px 15px",
              borderRadius: "15px",
              width: "fit-content",
              mr: "10px",
            }}
          >
            <Typography sx={{ fontWeight: "600", mb: "10px" }} noWrap={false}>
              {name}
            </Typography>
            <Typography noWrap={false} sx={{}}>
              {comment}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setIsLiked(!isLiked)} sx={{ mr: "5px" }}>
              <Badge badgeContent={10} color="primary">
                {isLiked ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </Badge>
            </IconButton>
            <IconButton sx={{ mr: "5px" }}>
              <ContentCopyIcon />
            </IconButton>
            <IconButton sx={{ mr: "5px" }}>
              <MoreHorizIcon />
            </IconButton>
            <Typography color={"secondary"} sx={{ opacity: "0.7" }}>
              {date}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const FormComment = () => {
  return (
    <Box sx={{ display: "flex", mb: "20px" }}>
      <Avatar sx={{ mr: "10px" }} />
      <TextField
        label="Comment"
        placeholder="Share your comment to author..."
        autoComplete={"none"}
        multiline
        sx={{
          flex: 1,
        }}
      ></TextField>
      <IconButton sx={{ height: "fit-content", alignSelf: "end" }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

const BlogCommentDrawer = ({ children }) => {
  const open = useSelector(blogCommentDrawer);
  return (
    <SideDrawer open={open} drawer="blogComment">
      <Box sx={{ maxWidth: "800px", width: "92%" }}>
        <Box
          sx={{
            height: "fit-content",
            width: "fit-content",
            mt: "80px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "600", mb: "20px" }}>
            {5} Comments
          </Typography>
          <Divider sx={{ m: "20px" }} />
          <FormComment />
          <Box sx={{ overflowY: "scroll", height: "100%" }}>
            <CommentItem
              name={"quanndb"}
              avatarURL={"/static/images/logo.jpg"}
              comment={
                "Quan dep trai v haha haha hahahaha hahaha hahahaha.Quan dep trai v haha haha hahahaha hahaha hahahaha"
              }
              like={true}
              date={"20:48 22/5/2024"}
            />
            <CommentItem
              name={"quanndb"}
              avatarURL={"/static/images/logo.jpg"}
              comment={"Quan dep trai"}
              like={false}
              date={"20:48 22/5/2024"}
            />
            <CommentItem
              name={"quanndb"}
              avatarURL={"/static/images/logo.jpg"}
              comment={
                "Quan dep trai v haha haha hahahaha hahaha hahahaha.Quan dep trai "
              }
              like={false}
              date={"20:48 22/5/2024"}
            />
            <CommentItem
              name={"quanndb"}
              avatarURL={"/static/images/logo.jpg"}
              comment={"Quan dep trai"}
              like={true}
              date={"20:48 22/5/2024"}
            />
            <CommentItem
              name={"quanndb"}
              avatarURL={"/static/images/logo.jpg"}
              comment={"hahahaha.Quan dep trai"}
              like={false}
              date={"20:48 22/5/2024"}
            />
            <CommentItem
              name={"quanndb"}
              avatarURL={"/static/images/logo.jpg"}
              comment={"hahahaha.Quan dep trai"}
              like={false}
              date={"20:48 22/5/2024"}
            />
            <CommentItem
              name={"quanndb"}
              avatarURL={"/static/images/logo.jpg"}
              comment={"hahahaha.Quan dep trai"}
              like={false}
              date={"20:48 22/5/2024"}
            />
          </Box>
        </Box>
      </Box>
    </SideDrawer>
  );
};

export default BlogCommentDrawer;
