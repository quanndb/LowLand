import { createSlice } from "@reduxjs/toolkit";

const DrawerManagerSlice = createSlice({
  name: "DrawerManager",
  initialState: { cartDrawerOpen: false, userDrawerOpen: false },
  reducers: {
    setOpenCartDrawer(state, action) {
      state.cartDrawerOpen = action.payload;
    },
  },
});
export default DrawerManagerSlice;
