import { createSlice } from "@reduxjs/toolkit";

const LoadingManagerSlice = createSlice({
  name: "LoadingManager",
  initialState: { isLoading: false },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});
export default LoadingManagerSlice;
