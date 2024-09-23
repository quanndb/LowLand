import { SwiperSlide } from "swiper/react";

import { Container } from "@mui/material";

import { CustomSwiper } from "src/components/CustomSwiper";
import ProductItem from "src/components/ProductItem";
import { formatPrice } from "src/utils/format-number";
import { useQuery } from "@tanstack/react-query";
import productAPI from "src/services/API/productAPI";
import ProductSkeleton from "src/components/ProductSkeleton";

export const SwiperProducts = () => {
  const { data: productsPage } = useQuery({
    queryKey: ["products", { size: 12, isActive: true, sortedBy: "sold" }],
    queryFn: () =>
      productAPI.getProducts({ size: 12, isActive: true, sortedBy: "sold" }),
  });

  return (
    <>
      {productsPage ? (
        <Container maxWidth={"lg"} sx={{ mb: "50px", display: "flex" }}>
          <CustomSwiper sx={{ mb: "20px" }}>
            {productsPage.response.map((item) => {
              return (
                <SwiperSlide key={item?.productId}>
                  <ProductItem
                    imageURL={item?.imageUrl}
                    isSale={Boolean(item?.salePrice)}
                    name={item?.productName}
                    salePrices={formatPrice(item?.salePrice)}
                    originalPrices={formatPrice(item?.price)}
                    id={item?.productId}
                  />
                </SwiperSlide>
              );
            })}
          </CustomSwiper>
        </Container>
      ) : (
        <ProductSkeleton />
      )}
    </>
  );
};
