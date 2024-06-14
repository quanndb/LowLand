import { Helmet } from "react-helmet-async";
import { ProductsView } from "src/sections/products/view";
import { PRODUCTS } from "src/mock/itemProduct.js";

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Products | LowLand</title>
      </Helmet>

      <ProductsView products={PRODUCTS}/>
    </>
  );
};

export default ProductsPage;
