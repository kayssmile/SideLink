import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: true,
};

export const AccountManagment = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action;
    },
  },
});

export const { setLoggedIn } = AccountManagment.actions;

export default AccountManagment.reducer;
