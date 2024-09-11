import { Masonry } from "@mui/lab";
import { Card, Skeleton } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import BlogItem from "src/components/BlogItem";
import SectionTitleB from "src/components/SectionTitleB";
import blogAPI from "src/services/API/blogAPI";

const AllArticleSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <Card sx={{ p: 3 }} key={index}>
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={200}
            sx={{ mb: "10px" }}
          />

          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={40}
            sx={{ mb: "10px" }}
          />
        </Card>
      ))}
    </>
  );
};

const AllArticle = () => {
  const {
    data: blogPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: ({ pageParam }) =>
      blogAPI.getBlogs({ page: pageParam, isActive: true }),
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
    }, 1000);

    return () => clearTimeout(timer);
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <SectionTitleB>All Articles</SectionTitleB>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={4}>
        {blogPage ? (
          blogPage.pages.map((page) => {
            return page.response.map((blog, index) => {
              const isLastItem =
                blogPage.pages[0].response.length === index + 1;
              return (
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
              );
            });
          })
        ) : (
          <AllArticleSkeleton />
        )}
        {hasNextPage && <AllArticleSkeleton />}
      </Masonry>
    </>
  );
};

export default AllArticle;
