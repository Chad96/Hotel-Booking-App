import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: 'user', // default role is 'user', can be changed to 'admin'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    resetRole: (state) => {
      state.role = 'user';
    },
  },
});

export const { setRole, resetRole } = userSlice.actions;

export default userSlice.reducer;
