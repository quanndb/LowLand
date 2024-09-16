import { useSelector } from "react-redux";
import React, { memo, useEffect, useState } from "react";

import { Box, Divider, Skeleton, Typography } from "@mui/material";

import SideDrawer from "src/components/navigation/SideDrawer";
import { blogCommentDrawer } from "src/redux/selectors/DrawerSelector";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import blogAPI from "src/services/API/blogAPI";
import { useInView } from "react-intersection-observer";
import Image from "src/components/Image";
import FormComment from "./FormComment";
import CommentItem from "./CommentItem";

const CommentSkeleton = memo(() => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <Box key={index}>
          <Box sx={{ mt: "20px", display: "flex", alignItems: "center" }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton
              variant="rounded"
              sx={{
                ml: "10px",
                height: "60px",
                // random width between 50% and 90%
                width: Math.random() * (90 - 50) + 50 + "%",
              }}
            />
          </Box>
          <Skeleton variant="text" sx={{ ml: "10px", width: "50%" }} />
        </Box>
      ))}
    </>
  );
});

const BlogCommentDrawer = () => {
  const state = useSelector(blogCommentDrawer);
  const [replyTo, setReplyTo] = useState(null);
  const {
    data: commentsPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", { blogId: state.blogId }],
    queryFn: ({ pageParam }) =>
      blogAPI.getComments(state.blogId, {
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
    enabled: !!state.blogId,
    refetchOnWindowFocus: false,
  });

  const { data: isLikedAndTotal, refetch: reFetchTotal } = useQuery({
    queryKey: ["isLikedAndTotal", { blogId: state.blogId }],
    queryFn: () => blogAPI.getIsLikedAndTotal(state.blogId),
    enabled: !!state.blogId,
    refetchOnWindowFocus: false,
  });
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <SideDrawer open={state.open} drawer="blogComment">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          minWidth: { sm: "600px", xs: "100vw" },
          width: "100%",
          pl: { sm: "40px", xs: "10px" },
        }}
      >
        <Box
          sx={{
            mt: "80px",
          }}
        >
          <Typography
            sx={{ fontSize: "20px", fontWeight: "600", mb: "20px", ml: "20px" }}
          >
            {JSON.parse(isLikedAndTotal || "{}")?.totalComments || 0} Comments
          </Typography>
          <Divider sx={{ m: "20px" }} />
          <FormComment
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            blogId={state.blogId}
            reFetchTotal={reFetchTotal}
          />
        </Box>
        <Box
          sx={{
            overflowY: "scroll", // Enable vertical scrolling
          }}
        >
          {commentsPage ? (
            commentsPage.pages.map((page, _) => (
              <React.Fragment key={_}>
                {page.response.length === 0 ? (
                  <Box>
                    <Image
                      imageURL="/static/images/no-comment.gif"
                      unShowOverlay={true}
                      sx={{
                        width: "100%",
                        height: "450px",
                        borderRadius: "50px",
                        objectFit: "contain",
                        opacity: ".7",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Oops! There's nothing here.
                    </Typography>
                  </Box>
                ) : (
                  page.response.map((comment, index) => {
                    const isLastItem =
                      commentsPage.pages[0].response.length === index + 1;
                    return (
                      <CommentItem
                        innerRef={isLastItem ? ref : undefined}
                        key={comment._id}
                        blogId={state.blogId}
                        parentsId={comment._id}
                        comment={comment}
                        setReplyTo={setReplyTo}
                      />
                    );
                  })
                )}
              </React.Fragment>
            ))
          ) : (
            <CommentSkeleton />
          )}
          {hasNextPage && <CommentSkeleton />}
        </Box>
      </Box>
    </SideDrawer>
  );
};

export default BlogCommentDrawer;
