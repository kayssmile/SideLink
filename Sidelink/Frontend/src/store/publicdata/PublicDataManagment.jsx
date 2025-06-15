import { createSlice } from '@reduxjs/toolkit';
import getPublicData from './actions/GetPublicDataAction';
import getPublicprofile from './actions/GetPublicProfileAction';

const initialState = {
  publicData: {
    searchEngineData: [],
    searchMask: {
      active: false,
      category: { type: 'category', data: false },
      subCategories: { type: 'subCategories', data: false },
      region: { type: 'region', data: false },
      serviceType: { type: 'type', data: false },
      text: { type: 'text', data: false },
    },
    publicServices: [],
    publicProfiles: { data: [], loading: false, success: false, error: false },
    loading: false,
    success: false,
    error: false,
    init: true,
  },
  mobileSidebar: false,
  themeMode: 'dark',
};

const PublicDataManagment = createSlice({
  name: 'publicDataManagment',
  initialState,
  reducers: {
    setInit: (state, { payload }) => {
      state.publicData.init = payload;
    },
    setSearchEngineData: (state, action) => {
      state.publicData.searchEngineData = action.payload;
    },
    setSearchMask: (state, { payload }) => {
      if (payload.type === 'category') {
        state.publicData.searchMask.category.data = payload.data;
      }
      if (payload.type === 'region') {
        state.publicData.searchMask.region.data = payload.data;
      }
      if (payload.type === 'type') {
        state.publicData.searchMask.serviceType.data = payload.data;
      }
      if (payload.type === 'subCategories') {
        state.publicData.searchMask.subCategories.data = payload.data;
      }
      if (payload.type === 'text') {
        state.publicData.searchMask.text.data = payload.data;
      }
    },
    resetPublicProfilesProcess: state => {
      state.publicData.publicProfiles = {
        ...state.publicData.publicProfiles,
        loading: false,
        success: false,
        error: false,
      };
    },
    toggleMobileSidebar: state => {
      state.mobileSidebar = !state.mobileSidebar;
    },
    setThemeMode: (state, { payload }) => {
      state.themeMode = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPublicData.pending, state => {
        state.publicData = { ...state.publicData, loading: true, success: false, error: false };
      })
      .addCase(getPublicData.fulfilled, (state, { payload }) => {
        state.publicData = {
          ...state.publicData,
          searchEngineData: payload.public_services_data,
          publicServices: payload.public_services_data,
          loading: false,
          success: true,
          error: false,
        };
      })
      .addCase(getPublicData.rejected, (state, { payload }) => {
        state.publicData = { ...state.publicData, loading: false, success: false, error: payload };
      })
      .addCase(getPublicprofile.pending, state => {
        state.publicData.publicProfiles = {
          ...state.publicData.publicProfiles,
          loading: true,
          success: false,
          error: false,
        };
      })
      .addCase(getPublicprofile.fulfilled, (state, { payload }) => {
        const profiles = state.publicData.publicProfiles.data;
        profiles.push(payload);
        state.publicData.publicProfiles = {
          data: profiles,
          loading: false,
          success: true,
          error: false,
        };
      })
      .addCase(getPublicprofile.rejected, (state, { payload }) => {
        state.publicData.publicProfiles = {
          ...state.publicData.publicProfiles,
          loading: false,
          success: false,
          error: payload,
        };
      });
  },
});

export const { setSearchEngineData, setSearchMask, setInit, resetPublicProfilesProcess, toggleMobileSidebar, setThemeMode } = PublicDataManagment.actions;

export default PublicDataManagment.reducer;
