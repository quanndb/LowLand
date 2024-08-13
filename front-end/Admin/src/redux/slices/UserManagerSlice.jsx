import { createSlice } from "@reduxjs/toolkit";

const UserManagerSlice = createSlice({
  name: "UserManager",
  initialState: { user: null, accessToken: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.userResponse;
      state.accessToken = action.payload.accessToken;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});
export default UserManagerSlice;
