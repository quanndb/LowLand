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

const HomeView = () => {
  const { data: pageData, isFetching } = useQuery({
    queryKey: ["products", { type: "Page" }],
    queryFn: () => productAPI.getProducts("?page=1&size=12"),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <>
      <HomeBanner />
      <HomeStory />

      <SectionTitle>FEATURED MUGS</SectionTitle>
      {isFetching || !pageData?.response ? (
        <ProductSkeleton />
      ) : (
        <SwiperProducts list={pageData?.response} />
      )}

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
      <HomeMagazine />

      <ShowCase imageURL={"/static/images/showCase.jpg"} />
      <HomeBlog />
    </>
  );
};

export default HomeView;
