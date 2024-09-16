import { Box, Container, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import ProductItem from "src/components/ProductItem";
import ProductSkeleton from "src/components/ProductSkeleton";
import { formatPrice } from "src/utils/format-number";

const ListProducts = () => {
  const { data: productsPage } = useQuery({
    queryKey: ["products", { size: 12, isActive: true }],
    queryFn: () => productAPI.getProducts({ size: 12, isActive: true }),
  });

  return (
    <>
      {productsPage ? (
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
              {productsPage.response.map((item) => {
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
      ) : (
        <>
          <ProductSkeleton />
          <ProductSkeleton />
        </>
      )}
    </>
  );
};
export default ListProducts;
