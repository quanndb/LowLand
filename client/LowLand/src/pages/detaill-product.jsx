import { Helmet } from "react-helmet-async";

import { useLoaderData } from "react-router-dom";
import { DetailProductView } from "src/sections/detailProduct/view";
import { PRODUCTS } from "src/mock/itemProduct";
import { useScrollToTop } from "src/hooks/use-scroll-to-top";
import { useEffect, useState } from "react";
import productAPI from "src/services/API/productAPI";
import { toast } from "react-toastify";
const DetailProductPage = () => {
  const product = useLoaderData();
  console.log(product);
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
  useScrollToTop();

  // console.log(product);
  return (
    <>
      <Helmet>
        <title>{product.product.productName} | LowLand</title>
      </Helmet>
      <DetailProductView productData={product} list={products} />
    </>
  );
};

export default DetailProductPage;
