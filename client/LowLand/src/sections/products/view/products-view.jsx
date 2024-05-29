import ProductsMain from "./products-main";
import { useDispatch } from "react-redux";
import { categories } from "src/mock/categories";

const ProductsView = () => {
  const dispatch = useDispatch();
  
  return (
    <>
      <ProductsMain categories={categories}/>
    </>
  );
};
export default ProductsView;
