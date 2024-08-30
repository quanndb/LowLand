import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import { DetailProductView } from "src/sections/detailProduct/view";
import productAPI from "src/services/API/productAPI";

const DetailProductPage = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

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
        queryFn: () => productAPI.getProducts({ size: 12, isActive: true }),
      },
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isFetching: results.some((result) => result.isFetching),
      };
    },
  });

  useEffect(() => {
    if (product && !product?.isActive) navigate("/404", { replace: true });
  }, [product]);

  return (
    <>
      <>
        <Helmet>
          <title>{product?.productName || "Loading..."} | LowLand</title>
        </Helmet>
        <DetailProductView
          productData={product}
          list={products?.response}
          isFetching={isFetching}
        />
      </>
    </>
  );
};

export default DetailProductPage;
