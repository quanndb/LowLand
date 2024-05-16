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
      price: 25000,
    },
  ],
  reducers: {
    addToCart(state, action) {
      let isExisted = false;
      state.forEach((item) => {
        if (item.id === action.payload.id) {
          item.quantity += Number(action.payload.quantity);
          isExisted = true;
          return;
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
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
export default CartManagerSlice;
