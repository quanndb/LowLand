import { Box, Grid } from "@mui/material";
import ProductItem from "src/components/ProductItem";
const AllProducts = ({ products }) => {
  return (
    <Box maxWidth={"xxl"}>
      <Grid
        container
        sx={{
          justifyContent: "center",
          gap: "15px",
          // gap: "75px",

          width: "100%",
        }}
      >
        {products.map((item) => {
          return (
            <Grid item md={3} xs={12} key={item.id}>
              <ProductItem
                id={item.id}
                imageURL={item.imageURL}
                isSale={item.isSale}
                name={item.name}
                salePrices={item.salePrices}
                originalPrices={item.originalPrices}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default AllProducts;
