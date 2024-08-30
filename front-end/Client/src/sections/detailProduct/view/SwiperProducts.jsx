import { SwiperSlide } from "swiper/react";

import { Container } from "@mui/material";

import { CustomSwiper } from "src/components/CustomSwiper";
import ProductItem from "src/components/ProductItem";
import { formatPrice } from "src/utils/format-number";

export const SwiperProducts = ({ list }) => {
  return (
    <>
      {list && (
        <Container maxWidth={"lg"} sx={{ mb: "50px", display: "flex" }}>
          <CustomSwiper sx={{ mb: "20px" }}>
            {list.map((item) => {
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
      )}
    </>
  );
};
