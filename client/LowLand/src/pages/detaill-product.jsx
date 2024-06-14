import { Helmet } from "react-helmet-async";

import { useLoaderData } from "react-router-dom";
import { DetailProductView } from "src/sections/detailProduct/view";
import { PRODUCTS } from "src/mock/itemProduct";
import { useScrollToTop } from "src/hooks/use-scroll-to-top";
const DetailProductPage = () => {
  const { product } = useLoaderData();

  useScrollToTop();

  // console.log(product);
  return (
    <>
      <Helmet>
        <title> | LowLand</title>
      </Helmet>
      <DetailProductView product={product[0]} list={PRODUCTS} />
    </>
  );
};

export default DetailProductPage;
