import {
  Card,
  CircularProgress,
  Grid,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BlogItem from "src/components/BlogItem";
import SectionTitleB from "src/components/SectionTitleB";
import { useDebounce } from "src/hooks/use-debounce";
import blogAPI from "src/services/API/blogAPI";
import PostSort from "./post-sort";

const AllArticleSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card sx={{ p: 3 }}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={200}
              sx={{ mb: "10px" }}
            />

            <Skeleton
              variant="rectangular"
              width={Math.random() * (100 - 70) + 70 + "%"}
              height={40}
              sx={{ mb: "10px" }}
            />
          </Card>
        </Grid>
      ))}
    </>
  );
};

export const AllArticle = ({ authorId }) => {
  const [status, setStatus] = useState("latest");
  const [search, setSearch] = useState("");
  const query = useDebounce(search, 500);

  const {
    data: blogPage,
    isFetching: blogLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "blogs",
      {
        authorId,
        query,
        sortDirection:
          status === "latest" || status === "popular" ? "DESC" : "ASC",
        sortedBy: status === "popular" ? "views" : "date",
      },
    ],
    queryFn: ({ pageParam }) =>
      blogAPI.getBlogs({
        query: query,
        page: pageParam,
        isActive: true,
        accountId: authorId,
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
      <SectionTitleB>All Articles</SectionTitleB>
      <Grid container mb={5} justifyContent={"space-between"} spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            sx={{ width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
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
        </Grid>
        <Grid item xs={12} md={3}>
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
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {blogPage ? (
          blogPage.pages.map((page, _) => (
            <React.Fragment key={_}>
              {page.response.map((blog, index) => {
                const isLastItem =
                  blogPage.pages[0].response.length === index + 1;
                return (
                  <Grid item md={4} xs={12} key={blog.blogId}>
                    <BlogItem
                      key={blog.blogId}
                      innerRef={isLastItem ? ref : undefined}
                      url={`/blogs/${blog?.blogId}`}
                      imageURL={blog.imageURL}
                      title={blog.title}
                      description={blog.description}
                      date={blog.date}
                      sx={{ borderRadius: "10px" }}
                    />
                  </Grid>
                );
              })}
            </React.Fragment>
          ))
        ) : (
          <AllArticleSkeleton />
        )}
        {hasNextPage && <AllArticleSkeleton />}
      </Grid>
    </>
  );
};

export default AllArticle;
