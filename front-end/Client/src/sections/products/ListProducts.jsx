import { Box, Container, Grid } from "@mui/material";

import ProductItem from "src/components/ProductItem";
import { formatPrice } from "src/utils/format-number";

const ListProducts = ({ products }) => {
  return (
    <>
      {products && (
        <Container maxWidth={"lg"}>
          <Box>
            <Grid
              container
              sx={{
                justifyContent: "center",
                width: "100%",
                margin: "auto",
              }}
              spacing={{ sm: 4, xs: 0 }}
            >
              {products.map((item) => {
                return (
                  <Grid item md={4} sm={6} xs={12} key={item.productId}>
                    <ProductItem
                      id={item.productId}
                      imageURL={item?.imageUrl}
                      isSale={Boolean(item?.salePrice)}
                      name={item.productName}
                      salePrices={formatPrice(item?.salePrice)}
                      originalPrices={formatPrice(item?.price)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
};
export default ListProducts;
