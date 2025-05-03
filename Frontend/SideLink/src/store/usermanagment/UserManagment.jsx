import { createSlice } from '@reduxjs/toolkit';
import registerUser from './actions/RegisterAction';
import login from './actions/LoginAction';
import getUser from './actions/GetUserAction';
import { setToken } from 'src/services/AuthService';

const initialState = {
  loading: { login: false, register: false, init: false },
  userInfo: null,
  error: { login: false, register: false, init: false },
  success: { login: false, register: false, init: false },
};

const userManagment = createSlice({
  name: 'userManagment',
  initialState,
  reducers: {
    userLogout: state => {
      state.userInfo = initialState.userInfo;
      state.loading = initialState.loading;
      state.success = initialState.success;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading.login = true;
        state.error.login = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading.login = false;
        state.error.login = false;
        state.success.login = true;
        //state.userInfo = payload.user;
        setToken(payload.access);
        //localStorage.setItem('accessToken', payload.access);
        //localStorage.setItem('userInfo', JSON.stringify(payload.user.id));

        /* for development, production is http-only cookie */
        localStorage.setItem('refreshToken', payload.refresh_token);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading.login = false;
        state.success.login = false;
        state.error.login = payload;
      })
      .addCase(registerUser.pending, state => {
        state.loading.register = true;
        state.error.register = null;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading.register = false;
        state.success.register = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading.register = false;
        state.error.register = payload;
      })
      .addCase(getUser.pending, state => {
        state.loading.init = true;
        state.error.init = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading.init = false;
        state.success.init = true;
        state.userInfo = payload;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading.init = false;
        state.error.init = payload;
      });
  },
});

export const { userLogout } = userManagment.actions;

export default userManagment.reducer;
