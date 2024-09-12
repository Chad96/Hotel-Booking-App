import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAdmin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAdmin = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
