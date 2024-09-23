import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper } from "swiper/react";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

export const CustomSwiper = ({ children, sx, isProductSwipper }) => {
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      navigation={isProductSwipper ? true : false}
      modules={
        isProductSwipper
          ? [Pagination, Navigation, Autoplay]
          : [Pagination, Autoplay]
      }
      spaceBetween={32}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
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
