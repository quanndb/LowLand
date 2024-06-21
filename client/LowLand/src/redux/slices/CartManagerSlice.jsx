import { createSlice } from "@reduxjs/toolkit";

const CartManagerSlice = createSlice({
  name: "CartManager",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      let isExisted = false;
      state.forEach((item) => {
        if (item.productID === action.payload.productID) {
          if (item.size === action.payload.size) {
            item.quantity += Number(action.payload.quantity);
            isExisted = true;
            return;
          }
        }
      });
      if (!isExisted) state.push(action.payload);
    },
    setQuantity(state, action) {
      state.forEach((item) => {
        if (item.id === action.payload.id) {
          item.quantity = action.payload.quantity;
          return;
        }
      });
    },
    setSize(state, action) {
      state.forEach((item) => {
        if (item.id === action.payload.id) {
          item.size = action.payload.size;
          return;
        }
      });
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      return [];
    },
  },
});
export default CartManagerSlice;
