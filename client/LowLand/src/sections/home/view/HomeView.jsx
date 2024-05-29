import HomeBanner from "../banner";
import HomeStory from "../story";
import HomeMagazine from "../magazine";
import HomeBlog from "../blogStory";
import ShowCase from "src/components/ShowCase";
import SectionTitle from "src/components/SectionTitle";
import AllProducts from "src/sections/products/view/allProducts";
import { SwiperProducts } from "src/sections/detailProduct/view/SwiperProducts";
import { PRODUCTS } from "src/mock/itemProduct";

const HomeView = () => {
  return (
    <>
      <HomeBanner />
      <HomeStory />

      <SectionTitle>FEATURED MUGS</SectionTitle>
      <SwiperProducts list={PRODUCTS}/>
      <SectionTitle>MORE PRODUCTS</SectionTitle>
      <AllProducts />
      <HomeMagazine />

      <ShowCase imageURL={"/static/images/showCase.jpg"} />
      <HomeBlog />
    </>
  );
};

export default HomeView;
