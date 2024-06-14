import { Box, Container, Grid } from "@mui/material";
import ProductItem from "src/components/ProductItem";
const AllProducts = ({ products }) => {
  return (
    <Container maxWidth={"lg"}>
      <Box>
        <Grid
          container
          sx={{
            justifyContent: "center",
            width: "100%",
          }}
          spacing={4}
        >
          {products.map((item) => {
            return (
              <Grid item md={4} sm={6} xs={12} key={item.id}>
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
    </Container>
  );
};
export default AllProducts;
