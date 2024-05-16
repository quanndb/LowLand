import { Box, Grid } from "@mui/material";
import ProductItem from "src/components/ProductItem";

const allProducts = () => {
  return (
    <Box>
      <Grid
        container
        sx={{
          justifyContent: "center",
          gap: "15px",
          width: "100%",
        }}
      >
        <Grid item>
          <ProductItem imageURL={"/static/images/product2.jpg"} />
        </Grid>
        <Grid item>
          <ProductItem imageURL={"/static/images/product3.jpg"} />
        </Grid>
        <Grid item>
          <ProductItem imageURL={"/static/images/product4.jpg"} />
        </Grid>
        <Grid item>
          <ProductItem imageURL={"/static/images/product4.jpg"} />
        </Grid>
        <Grid item>
          <ProductItem imageURL={"/static/images/product4.jpg"} />
        </Grid>
        <Grid item>
          <ProductItem imageURL={"/static/images/product4.jpg"} />
        </Grid>
        <Grid item>
          <ProductItem imageURL={"/static/images/product4.jpg"} />
        </Grid>
        <Grid item>
          <ProductItem imageURL={"/static/images/product4.jpg"} />
        </Grid>
        <Grid item>
          <ProductItem imageURL={"/static/images/product4.jpg"} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default allProducts;
