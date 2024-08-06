import ProductsMain from "./products-main";
import { useDispatch } from "react-redux";
import { categories } from "src/mock/categories";

const ProductsView = ({products}) => {
  const dispatch = useDispatch();
  console.log();
  return (
    <>
      <ProductsMain categories={categories} products={products}/>
    </>
  );
};
export default ProductsView;
