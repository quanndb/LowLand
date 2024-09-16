import { createSlice } from "@reduxjs/toolkit";

const DrawerManagerSlice = createSlice({
  name: "DrawerManager",
  initialState: {
    cartDrawerOpen: false,
    blogCommentDrawerOpen: {
      open: false,
      blogId: null,
    },
    userDrawerOpen: false,
  },
  reducers: {
    setOpenCartDrawer(state, action) {
      state.cartDrawerOpen = action.payload;
    },
    setOpenBlogCommentDrawer(state, action) {
      state.blogCommentDrawerOpen = action.payload;
    },
    setOpenUserDrawer(state, action) {
      state.userDrawerOpen = action.payload;
    },
  },
});
export default DrawerManagerSlice;
