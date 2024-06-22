import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper } from "swiper/react";

import { Pagination, Navigation } from "swiper/modules";
export const CustomSwiper = ({ children, sx, isProductSwipper }) => {
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      navigation={isProductSwipper ? true : false}
      modules={isProductSwipper ? [Pagination, Navigation] : [Pagination]}
      spaceBetween={32}
      breakpoints={
        isProductSwipper
          ? {
              0: {
                slidesPerView: 1,
              },
            }
          : {
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }
      }
      style={{ paddingBottom: "50px", ...sx }}
    >
      {children ? children : <></>}
    </Swiper>
  );
};
