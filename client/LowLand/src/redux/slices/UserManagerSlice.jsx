import { createSlice } from "@reduxjs/toolkit";

const UserManagerSlice = createSlice({
  name: "UserManager",
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});
export default UserManagerSlice;
