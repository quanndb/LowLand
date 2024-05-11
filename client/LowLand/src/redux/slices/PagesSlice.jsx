import { createSlice } from "@reduxjs/toolkit";

const PagesSlice = createSlice({
  name: "PagesSlice",
  initialState: { page: "" },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});
export default PagesSlice;
