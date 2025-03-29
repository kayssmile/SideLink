import { createSlice } from '@reduxjs/toolkit';
import registerUser from './services/RegisterAction';
import userLogin from './services/LoginAction';
import getUser from './services/GetUserAction';

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

const userManagment = createSlice({
  name: 'userManagment',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.userInfo = false;
      //state.userToken = null;
      state.success = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
    },
    setLoggedIn: (state, action) => {
      state.user = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user;
        localStorage.setItem('accessToken', payload.access);
        localStorage.setItem('userInfo', JSON.stringify(payload.user.id));

        /* for development, production is http-only cookie */
        localStorage.setItem('refreshToken', payload.refresh_token);
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userInfo = payload;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { login, logout, setLoggedIn } = userManagment.actions;

export default userManagment.reducer;
