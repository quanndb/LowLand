import { Container, Grid, Skeleton } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Container maxWidth={"lg"} sx={{ mb: "50px" }}>
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        <Grid item md={4} sm={6} xs={12}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={400}
            sx={{ mb: "10px" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            sx={{ mb: "10px" }}
          />
          <Skeleton variant="rectangular" width="100%" height={30} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={400}
            sx={{ mb: "10px" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            sx={{ mb: "10px" }}
          />
          <Skeleton variant="rectangular" width="100%" height={30} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={400}
            sx={{ mb: "10px" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            sx={{ mb: "10px" }}
          />
          <Skeleton variant="rectangular" width="100%" height={30} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductSkeleton;
