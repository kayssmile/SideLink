import { createSlice } from '@reduxjs/toolkit';
import registerUser from './services/RegisterAction';
import userLogin from './services/LoginAction';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
  loading: false,
  userInfo: {},
  userToken,
  error: null,
  success: false,
};

// melde mich an prüfe ob ein token vorhanden ist -
// wenn ein token vorhanden ist prüfe ich ob es noch gültig ist
// wenn es gültig ist sende ich eine anfrage für die benutzerdaten mit user_id
// wenn nicht gültig ein neues token - gleichzeitig

const accountManagment = createSlice({
  name: 'accountManagment',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.userInfo = {};
      state.userToken = null;
      state.success = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
    },
    setLoggedIn: (state, action) => {
      state.user = True;
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
        localStorage.setItem('userToken', payload.access);
        localStorage.setItem('userInfo', JSON.stringify(payload.user));

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
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { login, logout, setLoggedIn } = accountManagment.actions;

export default accountManagment.reducer;
