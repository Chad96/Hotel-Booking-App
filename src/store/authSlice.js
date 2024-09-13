import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Export the actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
