import { Helmet } from "react-helmet-async";
import { ProductsView } from "src/sections/products/view";
import { PRODUCTS } from "src/mock/itemProduct.js";
import { useEffect, useState } from "react";
import productAPI from "src/services/API/productAPI";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productAPI
      .getAll({
        productId: 0,
        inputRow: 0,
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
      <Helmet>
        <title>Products | LowLand</title>
      </Helmet>

      <ProductsView products={products} />
    </>
  );
};

export default ProductsPage;
