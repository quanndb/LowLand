import { Card, Container, Grid, Skeleton } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Container maxWidth={"lg"} sx={{ mb: "50px" }}>
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {[...Array(6)].map((_, index) => (
          <Grid item md={4} xs={12} key={index}>
            <Card sx={{ p: 3 }}>
              <Skeleton variant="rounded" width="100%" height={250} />
              <Skeleton
                variant="text"
                width={Math.random() * (95 - 60) + 60 + "%"}
                height={60}
              />
              <Skeleton
                variant="text"
                width={Math.random() * (60 - 30) + 30 + "%"}
                height={30}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductSkeleton;
