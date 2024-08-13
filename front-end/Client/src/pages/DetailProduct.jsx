import { useQueries, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "src/routes/loaders/blogLoader";
import { fetchProductById } from "src/routes/loaders/productLoader";

import { DetailProductView } from "src/sections/detailProduct/view";
import productAPI from "src/services/API/productAPI";

const DetailProductPage = () => {
  const { productId } = useParams();

  const {
    data: [product, products],
    isFetching,
  } = useQueries({
    queries: [
      {
        queryKey: ["products", { productId: productId }],
        queryFn: () => productAPI.getProductDetails(productId),
      },
      {
        queryKey: ["products", { type: "Page" }],
        queryFn: () => productAPI.getProducts("?page=1&size=12"),
      },
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isFetching: results.some((result) => result.isFetching),
      };
    },
  });

  return (
    <>
      <Helmet>
        <title>
          {product?.productName ? product.productName : "Loading..."} | LowLand
        </title>
      </Helmet>
      <DetailProductView
        productData={product}
        list={products?.response}
        isFetching={isFetching}
      />
    </>
  );
};

export default DetailProductPage;
