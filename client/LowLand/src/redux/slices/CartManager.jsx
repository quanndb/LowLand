import { createSlice } from "@reduxjs/toolkit";

const CartManagerSlice = createSlice({
  name: "CartManager",
  initialState: [
    {
      id: 1,
      productID: 123,
      productName: "Bac Xiu",
      imageURL: "static/images/logo.jpg",
      quantity: 5,
      price: 25,
    },
  ],
  reducers: {
    setCart(state, action) {
      return { ...state, ...action.payload };
    },
  },
});
export default CartManagerSlice;
