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
import { user } from "src/redux/selectors/UserSelector";
import { id } from "date-fns/locale";

const CommentItem = ({ avatarURL, name, date, like, comment }) => {
  const [isLiked, setIsLiked] = useState(like);
  return (
    <Box sx={{ my: "20px", pr: "20px" }}>
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
              wordBreak: "break-word", // Ensures long comments wrap
            }}
          >
            <Typography sx={{ fontWeight: "600", mb: "2px" }} noWrap={false}>
              {name}
            </Typography>
            <Typography>{comment}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: "5px" }}>
            <IconButton onClick={() => setIsLiked(!isLiked)} sx={{ mr: "5px" }}>
              <Badge badgeContent={isLiked ? 1 : 0} color="primary">
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

const FormComment = ({ comments, setComments }) => {
  const userdata = useSelector(user);
  const [newComment, setNewComment] = useState("");
  const handleAddComment = () => {
    if (newComment !== "") {
      setComments((comments) => [
        {
          id: comments.length + 1,
          name: userdata?.email,
          avatarURL: userdata?.imageURL,
          date: "20:48 22/5/2024",
          comment: newComment,
          like: false,
        },
        ...comments,
      ]);
      setNewComment("");
    }
  };
  return (
    <Box sx={{ display: "flex", mb: "20px" }}>
      <Avatar sx={{ mr: "10px" }} src={userdata?.imageURL} />
      <TextField
        label="Comment"
        placeholder="Share your comment to author..."
        autoComplete={"none"}
        multiline
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{
          flex: 1,
        }}
      ></TextField>
      <IconButton
        sx={{ height: "fit-content", alignSelf: "end" }}
        onClick={handleAddComment}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

const BlogCommentDrawer = ({ children }) => {
  const open = useSelector(blogCommentDrawer);
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "quanndb",
      avatarURL: "/static/images/logo.jpg",
      date: "20:48 22/5/2024",
      comment: "That was a good stuff!",
      like: true,
    },
    {
      id: 2,
      name: "vuminh",
      avatarURL: "/static/images/blog1.jpg",
      date: "20:48 22/5/2024",
      comment: "I love it",
      like: true,
    },
    {
      id: 3,
      name: "anhquan",
      avatarURL: "/static/images/product1.jpg",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in bibendum. ",
      like: false,
      date: "20:48 22/5/2024",
    },
    {
      id: 4,
      name: "khoile",
      avatarURL: "/static/images/product2.jpg",
      comment: "Nice!",
      like: true,
      date: "20:48 22/5/2024",
    },
    {
      id: 5,
      name: "sangha",
      avatarURL: "/static/images/product3.jpg",
      comment: "I can do it better",
      like: false,
      date: "20:48 22/5/2024",
    },
    {
      id: 6,
      name: "tankim",
      avatarURL: "/static/images/logo.jpg",
      comment: "Haha",
      like: false,
      date: "20:48 22/5/2024",
    },
    {
      id: 7,
      name: "quanndb",
      avatarURL: "/static/images/product4.jpg",
      comment: "I dont like it",
      like: false,
      date: "20:48 22/5/2024",
    },
    {
      id: 8,
      name: "tienmanh",
      avatarURL: "/static/images/product5.jpg",
      comment: "I love it again",
      like: false,
      date: "20:48 22/5/2024",
    },
  ]);
  return (
    <SideDrawer open={open} drawer="blogComment">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          width: "92%",
        }}
      >
        <Box
          sx={{
            mt: "80px",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "600", mb: "20px" }}>
            {comments.length} Comments
          </Typography>
          <Divider sx={{ m: "20px" }} />
          <FormComment setComments={setComments} />
        </Box>
        <Box
          sx={{
            overflowY: "scroll", // Enable vertical scrolling
          }}
        >
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              name={comment.name}
              avatarURL={comment.avatarURL}
              comment={comment.comment}
              date={comment.date}
              like={comment.like}
            />
          ))}
        </Box>
      </Box>
    </SideDrawer>
  );
};

export default BlogCommentDrawer;
