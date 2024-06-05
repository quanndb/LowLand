import { createSlice } from "@reduxjs/toolkit";

const CartManagerSlice = createSlice({
  name: "CartManager",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      let isExisted = false;
      state.forEach((item) => {
        if (item.productID === action.payload.productID) {
          item.quantity += Number(action.payload.quantity);
          isExisted = true;
          return;
        }
      });
      if (!isExisted) state.push(action.payload);
    },
    setQuantity(state, action) {
      state.forEach((item) => {
        if (item.productID === action.payload.productID) {
          item.quantity = action.payload.quantity;
          return;
        }
      });
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.productID !== action.payload);
    },
  },
});
export default CartManagerSlice;
