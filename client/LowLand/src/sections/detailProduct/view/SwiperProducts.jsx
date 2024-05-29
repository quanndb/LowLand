import { Container } from "@mui/material";
import { CustomSwiper } from "src/components/CustomSwiper";
import ProductItem from "src/components/ProductItem";
import { SwiperSlide } from "swiper/react";

export const SwiperProducts = ({list}) => {
  return (
    <Container maxWidth={"lg"} sx={{ mb: "50px" }}>
      <CustomSwiper sx={{ mb: "20px" }}>
        {list.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <ProductItem
                imageURL={item.imageURL}
                isSale={item.isSale}
                name={item.name}
                salePrices={item.salePrices}
                originalPrices={item.originalPrices}
                id={item.id}
              />
            </SwiperSlide>
          );
        })}
      </CustomSwiper>
    </Container>
  );
};
