import Grid from "@mui/material/Unstable_Grid2";
import { useInView } from "react-intersection-observer";
import PostCard from "./post-card";
import {
  InputAdornment,
  Grid as Grid2,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import PostSort from "./post-sort";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import blogAPI from "src/services/API/blogAPI";
import React, { useEffect, useState } from "react";
import PostSkeleton from "./post-skeleton";
import { useDebounce } from "src/hooks/use-debounce";
import Iconify from "src/components/iconify";

const PostList = ({ setSelectedPost }) => {
  const [status, setStatus] = useState("latest");
  const [search, setSearch] = useState("");
  const query = useDebounce(search, 500);

  const { data: storeBlogs } = useQuery({
    queryKey: ["storeBlogs"],
    queryFn: () =>
      blogAPI.getBlogs({
        isActive: true,
        size: 3,
        sortedBy: "views",
        categoryName: "Store stories",
      }),
  });

  const {
    data: blogPage,
    isFetching: blogLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "blogs",
      {
        sortDirection:
          status === "latest" || status === "popular" ? "DESC" : "ASC",
        sortedBy: status === "popular" ? "views" : "date",
        query: query,
      },
    ],
    queryFn: ({ pageParam }) =>
      blogAPI.getBlogs({
        page: pageParam,
        isActive: true,
        size: 8,
        query: query,
        sortDirection:
          status === "latest" || status === "popular" ? "DESC" : "ASC",
        sortedBy: status === "popular" ? "views" : "date",
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
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
    <>
      <Grid2 container mb={5} justifyContent={"space-between"} spacing={3}>
        <Grid2 item xs={12} md={6}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            sx={{ width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={"eva:search-fill"}
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              ),
            }}
          />
          {blogLoading ? (
            <CircularProgress size={20} sx={{ mt: 1 }} />
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, ml: 1 }}
            >
              {blogPage?.pages[0]?.totalRecords} results
            </Typography>
          )}
        </Grid2>
        <Grid2 item xs={12} md={3}>
          <PostSort
            value={status}
            options={[
              { value: "latest", label: "Latest" },
              { value: "popular", label: "Popular" },
              { value: "oldest", label: "Oldest" },
            ]}
            onSort={(e) => setStatus(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid2>
      </Grid2>
      <Grid container spacing={3}>
        {storeBlogs ? (
          storeBlogs.response?.map((post, index) => (
            <PostCard
              post={post}
              key={post.blogId}
              index={index}
              onClick={() => setSelectedPost(post.blogId)}
            />
          ))
        ) : (
          <PostSkeleton />
        )}
        {blogPage ? (
          blogPage.pages.map((page) =>
            page.response.map((post, index) => (
              <PostCard
                post={post}
                key={post.blogId}
                innerRef={index + 1 === 8 ? ref : undefined}
                onClick={() => setSelectedPost(post.blogId)}
              />
            ))
          )
        ) : (
          <PostSkeleton />
        )}
        {hasNextPage && (
          <>
            <PostSkeleton />
          </>
        )}
      </Grid>
    </>
  );
};

export default PostList;
