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

import FloatInOnScroll from "src/components/FloatIn";

const HomeView = () => {
  return (
    <>
      <HomeBanner />
      <HomeStory />

      <FloatInOnScroll>
        <SectionTitle>FEATURED MUGS</SectionTitle>
        <SwiperProducts />
      </FloatInOnScroll>

      <FloatInOnScroll>
        <SectionTitle>MORE PRODUCTS</SectionTitle>

        <Container
          maxWidth={"lg"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ListProducts />
          <ButtonLink
            href={"/products"}
            sx={{ mt: "50px", width: "50%" }}
            variant={"contained"}
          >
            See more products
          </ButtonLink>
        </Container>
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
