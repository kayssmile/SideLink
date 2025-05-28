import { createSlice } from '@reduxjs/toolkit';

import getDashboardData from 'src/store/dashboard/shared/actions/GetDashboardDataAction';
import createPublicService from './actions/CreatePublicServiceAction';
import putPublicService from './actions/PutPublicServiceAction';
import deletePublicService from './actions/DeletePublicServiceAction';

const initialState = {
  publicServices: {
    data: false,
    success: false,
    error: false,
    loading: false,
  },
};

const publicServicesManagment = createSlice({
  name: 'publicServices',
  initialState,
  reducers: {
    resetStatus: state => {
      state.publicServices = {
        ...state.publicServices,
        loading: false,
        success: false,
        error: false,
      };
    },
    removePublicService: (state, { payload }) => {
      const newData = state.publicServices.data.filter(service => service.id !== parseInt(payload.public_service_id));
      state.publicServices = { ...state.publicServices, data: newData, loading: false, success: false, error: false };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getDashboardData.fulfilled, (state, { payload }) => {
        state.publicServices = {
          ...state.publicServices,
          data: payload.public_services_data,
        };
        //  console.log('publicsservicesstate:', state.publicServices);
      })
      .addCase(createPublicService.pending, state => {
        state.publicServices = { ...state.publicServices, loading: true, success: false, error: false };
      })
      .addCase(createPublicService.fulfilled, (state, { payload }) => {
        state.publicServices = { ...state.publicServices, data: [...state.publicServices.data, payload], loading: false, success: true, error: false };
        // console.log('publicservicedataState', state.publicServices);
      })
      .addCase(createPublicService.rejected, (state, { payload }) => {
        state.publicServices = { ...state.publicServices, loading: false, success: false, error: payload };
        // console.log('publicservicedataerror', state.publicServices);
      })
      .addCase(putPublicService.pending, state => {
        // state.publicServices = { ...state.publicServices, loading: true, success: false, error: false };
      })
      .addCase(putPublicService.fulfilled, (state, { payload }) => {
        //console.log('patchservicedata', payload);
        const updatedStateData = state.publicServices.data.filter(service => service.id !== parseInt(payload.id));
        updatedStateData.push(payload);
        state.publicServices = { ...state.publicServices, data: updatedStateData, loading: false, success: true, error: false };
        // console.log('patchservicedataState', state.publicServices);
      })
      .addCase(putPublicService.rejected, (state, { payload }) => {
        state.publicServices = { ...state.publicServices, loading: false, success: false, error: payload };
        //console.log('patchservicedataerror', state.publicServices);
      })
      .addCase(deletePublicService.pending, state => {
        state.publicServices = { ...state.publicServices, loading: true, success: false, error: false };
      })
      .addCase(deletePublicService.fulfilled, (state, { payload }) => {
        state.publicServices = { ...state.publicServices, loading: false, success: true, error: false };
      })
      .addCase(deletePublicService.rejected, (state, { payload }) => {
        state.publicServices = { ...state.publicServices, loading: false, success: false, error: payload };
      });
  },
});

export const { resetStatus, removePublicService } = publicServicesManagment.actions;

export default publicServicesManagment.reducer;
