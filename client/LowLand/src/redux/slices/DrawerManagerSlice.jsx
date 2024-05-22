import { createSlice } from "@reduxjs/toolkit";

const DrawerManagerSlice = createSlice({
  name: "DrawerManager",
  initialState: { cartDrawerOpen: false, blogCommentDrawerOpen: false },
  reducers: {
    setOpenCartDrawer(state, action) {
      state.cartDrawerOpen = action.payload;
    },
    setOpenBlogCommentDrawer(state, action) {
      state.blogCommentDrawerOpen = action.payload;
    },
  },
});
export default DrawerManagerSlice;
