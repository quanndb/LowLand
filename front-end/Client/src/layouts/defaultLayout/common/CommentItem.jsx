import React, { memo, useState } from "react";

import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import blogAPI from "src/services/API/blogAPI";

const CommentItem = memo(
  ({ innerRef, blogId, parentsId, comment, type, setReplyTo }) => {
    const [isShowReplies, setIsShowReplies] = useState(false);

    const queryClient = useQueryClient();

    const {
      data: replies,
      refetch: getReplies,
      hasNextPage,
      fetchNextPage,
      isFetching,
    } = useInfiniteQuery({
      queryKey: ["replies", { blogId, commentId: comment._id }],
      queryFn: ({ pageParam }) =>
        blogAPI.getReplies(blogId, comment._id, { page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.page + 1;
      },
      enabled: false,
      refetchOnWindowFocus: false,
    });

    const { mutate: likeComment } = useMutation({
      mutationKey: ({ blogId, commentId }) => [
        "likeComment",
        { blogId: blogId, commentId: commentId },
      ],
      mutationFn: ({ blogId, commentId }) =>
        blogAPI.likeComment(blogId, commentId),
    });

    const handleGetReplies = () => {
      if (!isShowReplies) {
        setIsShowReplies(true);
        getReplies();
      }
    };

    const handleShowLess = () => {
      setIsShowReplies(false);
    };

    const handleLikeComment = (blogId, commentId, parentsId) => {
      likeComment(
        { blogId, commentId },
        {
          onSuccess: () => {
            queryClient.setQueryData(
              [
                `${type === "reply" ? "replies" : "comments"}`,
                type === "reply"
                  ? { blogId, commentId: parentsId }
                  : { blogId },
              ],
              (data) => {
                if (!data) return;
                return {
                  ...data,
                  pages: data.pages.map((page) => {
                    return {
                      ...page,
                      response: page.response.map((comment) => {
                        if (comment._id === commentId) {
                          return {
                            ...comment,
                            liked: !comment.liked,
                            totalLikes: !comment.liked
                              ? comment.totalLikes + 1
                              : comment.totalLikes - 1,
                          };
                        }
                        return comment;
                      }),
                    };
                  }),
                };
              }
            );
          },
        }
      );
    };

    const handleSetReply = (commentId, email) => {
      setReplyTo({
        email,
        blogId,
        parentsId,
        commentId,
        handleGetReplies,
      });
    };

    return (
      <Box
        sx={{
          mt: "15px",
          pr: `${type === "reply" ? "0px" : "20px"}`,
          ml: `${type === "reply" ? "60px" : "0px"}`,
          border: "1px solid #f2f3f5",
          borderRadius: "20px",
          p: 1,
        }}
        ref={innerRef}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            sx={{ mr: "10px", border: "2px solid var(--primary-color)" }}
            src={comment?.imageURL}
          />
          <Box>
            <Box
              sx={{
                backgroundColor: "#f2f3f5",
                p: "8px 15px",
                borderRadius: "15px",
                width: "fit-content",
                wordBreak: "break-word",
              }}
            >
              <Typography sx={{ fontWeight: "600", mb: "2px" }} noWrap={false}>
                {comment?.email}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
              >
                <Typography
                  component={"span"}
                  sx={{
                    mr: "5px",
                    textDecoration: "underline",
                  }}
                >
                  {comment?.replyTo || ""}
                </Typography>
                {comment.content}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: "5px" }}>
              <IconButton
                onClick={() =>
                  handleLikeComment(blogId, comment._id, comment.parentsId)
                }
                sx={{ mr: "5px" }}
              >
                <Badge badgeContent={comment.totalLikes} color="primary">
                  {comment?.liked ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </Badge>
              </IconButton>
              <IconButton
                sx={{ mr: "5px" }}
                onClick={() => handleSetReply(comment._id, comment.email)}
              >
                <Badge badgeContent={comment.totalComments} color="primary">
                  <ChatBubbleOutlineOutlinedIcon />
                </Badge>
              </IconButton>
              <IconButton sx={{ mr: "5px" }}>
                <MoreHorizIcon />
              </IconButton>
              <Typography color={"secondary"} sx={{ opacity: "0.7" }}>
                {new Date(comment.commentedDate).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>

        {
          // show replies
          replies && isShowReplies && (
            <>
              {replies?.pages?.map((page, index) => (
                <React.Fragment key={index}>
                  {page?.response?.map((reply) => (
                    <CommentItem
                      key={reply._id}
                      innerRef={null}
                      blogId={blogId}
                      parentsId={parentsId}
                      setReplyTo={setReplyTo}
                      comment={reply}
                      type="reply"
                    />
                  ))}
                </React.Fragment>
              ))}
              {}
            </>
          )
        }
        {/* show replies */}
        <Button
          onClick={handleGetReplies}
          sx={{
            textDecoration: "underline",
            ml: "30px",
            display: `${
              comment.totalComments > 0 &&
              (!replies || (!isShowReplies && type !== "reply"))
                ? "block"
                : "none"
            }`,
          }}
          startIcon={isFetching ? <CircularProgress size={15} /> : null}
        >
          Show {comment.totalComments} replies
        </Button>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={fetchNextPage}
            sx={{
              textDecoration: "underline",
              ml: "50px",
              display: `${hasNextPage && isShowReplies ? "block" : "none"}`,
            }}
            startIcon={isFetching ? <CircularProgress size={15} /> : null}
          >
            Show more replies
          </Button>
          <Button
            onClick={handleShowLess}
            sx={{
              textDecoration: "underline",
              ml: "50px",
              display: `${
                isShowReplies && type !== "reply" ? "block" : "none"
              }`,
            }}
          >
            Show less
          </Button>
        </Box>
      </Box>
    );
  }
);

export default CommentItem;
