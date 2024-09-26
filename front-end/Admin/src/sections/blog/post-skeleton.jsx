import { Box, Card, Grid, Skeleton, Stack } from "@mui/material";

const PostSkeleton = ({ type }) => {
  return (
    <Grid container>
      {[...Array(4)].map((_, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={index}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <PostSkeletonItem type={type} sx={{ width: "100%" }} />
        </Grid>
      ))}
    </Grid>
  );
};

export const PostSkeletonItem = () => {
  return (
    <Card sx={{ p: 2, width: "100%", mx: "12px", my: "12px" }}>
      <Stack spacing={3}>
        <Skeleton sx={{ height: 180, width: "100%" }} variant="rectangular" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Stack>
    </Card>
  );
};

export default PostSkeleton;
