import "swiper/css";
import "swiper/css/pagination";
import { Swiper } from "swiper/react";

import { Pagination } from "swiper/modules";
export const CustomSwiper = ({ children, sx }) => {
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      slidesPerView={2}
      modules={[Pagination]}
      spaceBetween={32}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      }}
      style={{ paddingBottom: "50px", ...sx }}
    >
      {children ? children : <></>}
    </Swiper>
  );
};
