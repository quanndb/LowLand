import { Card, Grid, Skeleton } from "@mui/material";

const BlogMenuSkeleton = () => {
  return (
    <>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Card key={index} sx={{ width: "100%", padding: "20px", mb: "20px" }}>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Skeleton variant="rectangular" width={"100%"} height={200} />
              </Grid>
              <Grid item md={8} xs={12}>
                <Skeleton
                  variant="rectangular"
                  width={Math.random() * (95 - 60) + 60 + "%"}
                  height={40}
                  sx={{ mb: "10px" }}
                />
                <Skeleton variant="rectangular" width={"100%"} height={150} />
              </Grid>
            </Grid>
          </Card>
        ))}
    </>
  );
};

export default BlogMenuSkeleton;
