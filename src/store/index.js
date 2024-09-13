import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice'; // Assuming you have a userSlice

const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth reducer here
    user: userReducer,  // Existing user reducer
  },
});

export default store;
