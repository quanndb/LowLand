import HomeBanner from "../banner";
import HomeStory from "../story";
import HomeMagazine from "../magazine";
import HomeBlog from "../blogStory";
import ShowCase from "src/components/ShowCase";
import SectionTitle from "src/components/SectionTitle";
import AllProducts from "src/sections/products/view/allProducts";
import { SwiperProducts } from "src/sections/detailProduct/view/SwiperProducts";
import { PRODUCTS } from "src/mock/itemProduct";
import { useEffect, useState } from "react";
import productAPI from "src/services/API/productAPI";
import { toast } from "react-toastify";

const HomeView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productAPI
      .getAll({
        productId: 0,
        inputRow: 12,
      })
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  return (
    <>
      <HomeBanner />
      <HomeStory />

      <SectionTitle>FEATURED MUGS</SectionTitle>
      <SwiperProducts list={products} />
      <SectionTitle>MORE PRODUCTS</SectionTitle>
      <AllProducts products={products} />
      <HomeMagazine />

      <ShowCase imageURL={"/static/images/showCase.jpg"} />
      <HomeBlog />
    </>
  );
};

export default HomeView;
