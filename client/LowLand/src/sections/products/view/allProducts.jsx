import { Box, Grid } from "@mui/material";
import ProductItem from "src/components/ProductItem";
import { PRODUCTS } from "src/mock/itemProduct.js";
const AllProducts = () => {
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
        {/* sx,
  imageURL,
  name,
  originalPrices,
  salePrices,
  isSale, */}

        {PRODUCTS.map((item) => {
          return (
            <Grid item key={item.id}>
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
