import { Helmet } from "react-helmet-async";

import { ProductsView } from "src/sections/products/view";

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Products | LowLand</title>
      </Helmet>

      <ProductsView />
    </>
  );
};

export default ProductsPage;
