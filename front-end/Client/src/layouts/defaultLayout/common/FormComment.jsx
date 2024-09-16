import { useSelector } from "react-redux";
import React, { memo, useState } from "react";

import {
  Avatar,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

import { user } from "src/redux/selectors/UserSelector";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogAPI from "src/services/API/blogAPI";

const FormComment = memo(({ blogId, replyTo, setReplyTo, reFetchTotal }) => {
  const userdata = useSelector(user);
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");

  const { mutate: createComment, isPending } = useMutation({
    mutationKey: (blogId) => {
      if (replyTo) {
        return ["createReply", blogId, replyTo.parentsId, replyTo.commentId];
      }
      return ["createComment", { blogId: blogId }];
    },
    mutationFn: (blogId) => {
      if (replyTo) {
        return blogAPI.addReply(blogId, replyTo.parentsId, replyTo.commentId, {
          content: newComment,
        });
      }
      return blogAPI.addComment(blogId, {
        content: newComment,
      });
    },
  });

  const handleAddComment = (e) => {
    e.preventDefault();

    if (newComment !== "") {
      createComment(blogId, {
        onSuccess: (res) => {
          setNewComment("");
          if (replyTo) replyTo.handleGetReplies();
          setReplyTo(null);
          reFetchTotal();
          queryClient.setQueryData(
            [
              `${replyTo ? "replies" : "comments"}`,
              replyTo
                ? { blogId: blogId, commentId: replyTo.parentsId }
                : { blogId: blogId },
            ],
            (data) => {
              return {
                ...data,
                pages: data.pages.map((page) => {
                  return {
                    ...page,
                    response: [
                      {
                        ...res,
                        email: userdata.email,
                        imageURL: userdata.imageURL,
                        totalComments: 0,
                        totalLikes: 0,
                        isLiked: false,
                      },
                      ...page.response,
                    ],
                  };
                }),
              };
            }
          );
          if (replyTo) {
            queryClient.setQueryData(
              ["comments", { blogId: blogId }],
              (data) => {
                return {
                  ...data,
                  pages: data.pages.map((page) => {
                    return {
                      ...page,
                      response: page.response.map((comment) => {
                        if (comment._id === replyTo.parentsId) {
                          return {
                            ...comment,
                            totalComments: comment.totalComments + 1,
                          };
                        } else {
                          return comment;
                        }
                      }),
                    };
                  }),
                };
              }
            );
          }
        },
      });
    }
  };
  return (
    <form
      onSubmit={handleAddComment}
      style={{
        width: "100%",
        display: "flex",
        paddingBottom: "10px",
      }}
    >
      <Avatar
        src={userdata?.imageURL}
        sx={{ border: "2px solid var(--primary-color)", mr: "10px" }}
      />
      <TextField
        label={`${replyTo ? `Replying to ${replyTo.email}` : "Comment"}`}
        placeholder="Share your comment with the author..."
        autoComplete="off"
        multiline
        value={newComment}
        disabled={isPending}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{
          width: "100%",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleAddComment(e); // Handle Enter key press
          }
        }}
        InputProps={{
          endAdornment: (
            <>
              {replyTo && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setReplyTo(null)}>
                    <CancelSharpIcon />
                  </IconButton>
                </InputAdornment>
              )}
            </>
          ),
        }}
      />
      <IconButton
        sx={{ height: "fit-content", alignSelf: "end" }}
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <CircularProgress size={20} />
        ) : (
          <SendIcon sx={{ color: "var(--primary-color)" }} />
        )}
      </IconButton>
    </form>
  );
});

export default FormComment;
