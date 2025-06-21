import { createSlice } from '@reduxjs/toolkit';
import registerUser from './actions/RegisterAction';
import login from './actions/LoginAction';
import { setToken, setRefreshToken } from 'src/components/shared/utils/TokenUtils';

const initialState = {
  loading: { login: false, register: false, init: false },
  error: { login: false, register: false, init: false },
  success: { login: false, register: false, init: false },
  infoModal: false,
};

const userManagment = createSlice({
  name: 'userManagment',
  initialState,
  reducers: {
    userLogout: state => {
      state.loading = initialState.loading;
      state.success = initialState.success;
      state.error = initialState.error;
    },
    toggleInfoModal: state => {
      state.infoModal = !state.infoModal;
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
        setToken(payload.access);
        setRefreshToken(payload.refresh_token);
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
      });
  },
});

export const { userLogout, toggleInfoModal } = userManagment.actions;

export default userManagment.reducer;
