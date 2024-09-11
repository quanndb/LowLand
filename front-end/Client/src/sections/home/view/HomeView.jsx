import { useQuery } from "@tanstack/react-query";

import { Container } from "@mui/material";

import HomeBanner from "../Banner";
import HomeBlog from "../BlogStory";
import HomeStory from "../Story";
import HomeMagazine from "../Magazine";

import ButtonLink from "src/components/ButtonLink";
import ProductSkeleton from "src/components/ProductSkeleton";
import ShowCase from "src/components/ShowCase";
import SectionTitle from "src/components/SectionTitle";
import ListProducts from "src/sections/products/ListProducts";
import { SwiperProducts } from "src/sections/detailProduct/view/SwiperProducts";

import productAPI from "src/services/API/productAPI";
import FloatInOnScroll from "src/components/FloatIn";

const HomeView = () => {
  const { data: pageData, isFetching } = useQuery({
    queryKey: [
      "products",
      {
        size: 12,
        isActive: true,
      },
    ],
    queryFn: () =>
      productAPI.getProducts({
        size: 12,
        isActive: true,
      }),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <>
      <HomeBanner />
      <HomeStory />

      <FloatInOnScroll>
        <SectionTitle>FEATURED MUGS</SectionTitle>
        {isFetching || !pageData?.response ? (
          <ProductSkeleton />
        ) : (
          <SwiperProducts list={pageData?.response} />
        )}
      </FloatInOnScroll>

      <FloatInOnScroll>
        <SectionTitle>MORE PRODUCTS</SectionTitle>
        {isFetching || !pageData?.response ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : (
          <Container
            maxWidth={"lg"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ListProducts products={pageData?.response} />
            <ButtonLink
              href={"/products"}
              sx={{ mt: "50px", width: "50%" }}
              variant={"contained"}
            >
              See more products
            </ButtonLink>
          </Container>
        )}
      </FloatInOnScroll>

      <FloatInOnScroll>
        <HomeMagazine />
      </FloatInOnScroll>

      <ShowCase imageURL={"/static/images/showCase.jpg"} />

      <FloatInOnScroll>
        <HomeBlog />
      </FloatInOnScroll>
    </>
  );
};

export default HomeView;
