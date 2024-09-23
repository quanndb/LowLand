import Grid from "@mui/material/Unstable_Grid2";
import PostCard from "./post-card";
import { posts } from "src/_mock/blog";
import { Stack } from "@mui/material";
import PostSearch from "./post-search";
import PostSort from "./post-sort";

const PostList = () => {
  return (
    <>
      <Stack
        mb={5}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: "latest", label: "Latest" },
            { value: "popular", label: "Popular" },
            { value: "oldest", label: "Oldest" },
          ]}
        />
      </Stack>
      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </>
  );
};

export default PostList;
