import ProductsMain from "./products-main";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Button } from "@mui/material";

import CartManagerSlice from "src/redux/slices/CartManager";
import { categories } from "src/mock/categories";

const ProductsView = () => {
  const dispatch = useDispatch();
  
  return (
    <>
      {/* <Button onClick={handleAddToCart}>Product</Button> */}
      <ProductsMain categories={categories}/>
    </>
  );
};
export default ProductsView;
