import ProductsMain from "./products-main";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Button } from "@mui/material";

import CartManagerSlice from "src/redux/slices/CartManager";

const ProductsView = () => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const newItem = {
      productID: 21,
      productName:
        "Bac Xiu Bac Xiu Bac Xiu Bac Xiu Bac Xiu Bac Xiu Bac Xiu Bac Xiu Bac Xiu Bac Xiu Bac Xiu Bac Xiu bac xiu",
      imageURL: "/static/images/blog1.jpg",
      quantity: 2,
      price: 25000,
    };
    dispatch(CartManagerSlice.actions.addToCart(newItem));
    toast.success("Add to cart successfully!");
  };
  return (
    <>
      <Button onClick={handleAddToCart}>Product</Button>
      <ProductsMain />
    </>
  );
};
export default ProductsView;
