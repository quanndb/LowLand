import { useSelector } from "react-redux";
import React, { memo, useEffect, useState } from "react";

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
import { toast } from "react-toastify";

const FormComment = memo(
  ({ blogId, replyTo, setReplyTo, reFetchTotal, formRef }) => {
    const userdata = useSelector(user);
    const queryClient = useQueryClient();
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
      if (replyTo && replyTo.type === "edit") {
        setNewComment(replyTo.content);
      }
    }, [replyTo]);

    const { mutate: createComment, isPending } = useMutation({
      mutationKey: (blogId) => {
        if (replyTo) {
          if (replyTo?.type !== "edit")
            return [
              "createReply",
              blogId,
              replyTo.parentsId,
              replyTo.commentId,
            ];
          return ["createReply", blogId, replyTo.parentsId, replyTo.commentId];
        }
        return [
          "updateComment",
          { blogId: blogId, commentId: replyTo?.commentId },
        ];
      },
      mutationFn: (blogId) => {
        if (replyTo) {
          if (replyTo?.type !== "edit")
            return blogAPI.addReply(
              blogId,
              replyTo.parentsId,
              replyTo.commentId,
              {
                content: newComment,
              }
            );
          return blogAPI.updateComment(blogId, replyTo.commentId, {
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
            if (replyTo && replyTo.type !== "edit") replyTo.handleGetReplies();

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
                              totalComments:
                                replyTo.type === "edit"
                                  ? comment.totalComments
                                  : comment.totalComments + 1,
                              content:
                                replyTo.type === "edit"
                                  ? newComment
                                  : comment.content,
                              updatedDate:
                                replyTo.type === "edit"
                                  ? new Date()
                                  : comment?.updatedDate,
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
            queryClient.setQueryData(
              [
                `${replyTo ? "replies" : "comments"}`,
                replyTo
                  ? { blogId: blogId, commentId: replyTo.parentsId }
                  : { blogId: blogId },
              ],
              (data) => {
                if (!data) return;

                return {
                  ...data,
                  pages: data.pages.map((page) => {
                    return {
                      ...page,
                      response: [
                        ...(!replyTo || replyTo?.type !== "edit"
                          ? [
                              {
                                ...res,
                                email: userdata.email,
                                imageURL: userdata.imageURL,
                                totalComments: 0,
                                totalLikes: 0,
                                isLiked: false,
                              },
                            ]
                          : []),
                        ...(replyTo
                          ? page.response.map((comment) => {
                              if (comment._id === replyTo.commentId)
                                return {
                                  ...comment,
                                  totalComments:
                                    replyTo.type === "edit"
                                      ? comment.totalComments
                                      : comment.totalComments + 1,
                                  content:
                                    replyTo.type === "edit"
                                      ? newComment
                                      : comment.content,
                                  updatedDate:
                                    replyTo.type === "edit"
                                      ? new Date()
                                      : comment?.updatedDate,
                                };
                              return comment;
                            })
                          : page.response),
                      ],
                    };
                  }),
                };
              }
            );
            setNewComment("");
            setReplyTo(null);
            reFetchTotal();
            toast.success("Send comment successfully");
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
          inputRef={formRef}
          label={`${
            replyTo
              ? `${
                  replyTo.type !== "edit"
                    ? `Reply to ${replyTo.email}`
                    : "Edit comment"
                } `
              : "Comment"
          }`}
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
                    <IconButton
                      onClick={() => {
                        setReplyTo(null);
                        setNewComment("");
                      }}
                    >
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
  }
);

export default FormComment;
