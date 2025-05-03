import { createSlice } from '@reduxjs/toolkit';
import getDashboardData from 'src/store/dashboard/shared/actions/GetDashboardDataAction';
import patchPublicProfile from './actions/PatchPublicProfileAction';

const initialState = {
  publicProfile: {
    data: false,
    success: false,
    error: false,
    loading: false,
  },
};

const publicProfileManagment = createSlice({
  name: 'publicprofile',
  initialState,
  reducers: {
    resetProcess: state => {
      state.publicProfile = { ...state.publicProfile, success: false, error: false };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getDashboardData.fulfilled, (state, { payload }) => {
        state.publicProfile = {
          ...state.dashboardData,
          data: payload.public_profile_data,
        };
        // console.log('publicprofiledata', state.publicProfile);
      })
      .addCase(patchPublicProfile.pending, state => {
        state.publicProfile = { ...state.publicProfile, loading: true, success: false, error: false };
      })
      .addCase(patchPublicProfile.fulfilled, (state, { payload }) => {
        state.publicProfile = { ...state.publicProfile, data: payload, loading: false, success: true, error: false };
        //  console.log('publicprofiledataState', state.publicProfile);
      })
      .addCase(patchPublicProfile.rejected, (state, { payload }) => {
        state.publicProfile = { ...state.publicProfile, loading: false, success: false, error: payload };
        //console.log('publicprofiledataerror', state.publicProfile);
      });
  },
});

export const { resetProcess } = publicProfileManagment.actions;

export default publicProfileManagment.reducer;
