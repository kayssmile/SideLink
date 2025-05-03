import { createSlice } from '@reduxjs/toolkit';
import getDashboardData from 'src/store/dashboard/shared/actions/GetDashboardDataAction';
import patchAccountDetails from './actions/PatchAccountDataAction';
import patchAccountEmail from './actions/PatchAccountEmailAction';
import patchAccountPassword from './actions/PatchAccountPasswordAction';

const initialState = {
  sidebar: window.innerWidth > 768,
  themeMode: 'light',
  dashboardData: {
    user: {},
    publicProfile: {},
    publicServices: {},
    success: false,
    error: false,
    loading: false,
  },
  accountDetails: {
    success: false,
    error: false,
    loading: false,
  },
  changeEmail: {
    success: false,
    error: false,
    loading: false,
  },
  changePassword: {
    success: false,
    error: false,
    loading: false,
  },
};

const dashboardManagment = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state, payload) => {
      state.sidebar = !state.sidebar;
    },
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
    toggleThemeMode: (state, action) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    dashboardLogout: (state, action) => {
      return { ...state, ...initialState };
    },
    resetProcess: (state, action) => {
      if (action.payload === 'accountDetails') {
        state.accountDetails = { ...state.accountDetails, success: false, error: false };
      } else if (action.payload === 'changeEmail') {
        state.changeEmail = { ...state.changeEmail, success: false, error: false };
      } else if (action.payload === 'changePassword') {
        state.changePassword = { ...state.changePassword, success: false, error: false };
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getDashboardData.pending, state => {
        state.dashboardData = { ...state.dashboardData, loading: true, success: false, error: false };
      })
      .addCase(getDashboardData.fulfilled, (state, { payload }) => {
        state.dashboardData = {
          ...state.dashboardData,
          loading: false,
          success: true,
          error: false,
          user: payload.user_data,
          publicProfile: payload.public_profile_data,
          publicServices: payload.public_services_data,
        };
      })
      .addCase(getDashboardData.rejected, (state, { payload }) => {
        state.dashboardData = { ...state.dashboardData, loading: false, success: false, error: payload };
      })
      .addCase(patchAccountDetails.pending, state => {
        state.accountDetails = { ...state.accountDetails, loading: true, success: false, error: false };
      })
      .addCase(patchAccountDetails.fulfilled, (state, { payload }) => {
        state.accountDetails = { ...state.accountDetails, loading: false, success: true, error: false };
        state.dashboardData = { ...state.dashboardData, user: payload };
      })
      .addCase(patchAccountDetails.rejected, (state, { payload }) => {
        state.accountDetails = { ...state.accountDetails, loading: false, success: false, error: payload };
      })
      .addCase(patchAccountEmail.pending, state => {
        state.changeEmail = { ...state.changeEmail, loading: true, success: false, error: false };
      })
      .addCase(patchAccountEmail.fulfilled, (state, { payload }) => {
        state.changeEmail = { ...state.changeEmail, loading: false, success: true, error: false };
        state.dashboardData = { ...state.dashboardData, user: payload };
      })
      .addCase(patchAccountEmail.rejected, (state, { payload }) => {
        state.changeEmail = { ...state.changeEmail, loading: false, success: false, error: payload };
      })
      .addCase(patchAccountPassword.pending, state => {
        state.changePassword = { ...state.changePassword, loading: true, error: false, success: false };
      })
      .addCase(patchAccountPassword.fulfilled, (state, { payload }) => {
        state.changePassword = { ...state.changePassword, loading: false, success: true, error: false };
      })
      .addCase(patchAccountPassword.rejected, (state, { payload }) => {
        state.changePassword = { ...state.changePassword, loading: false, success: false, error: payload };
      });
  },
});

export const { toggleSidebar, setSidebar, toggleThemeMode, dashboardLogout, resetProcess } = dashboardManagment.actions;

export default dashboardManagment.reducer;
