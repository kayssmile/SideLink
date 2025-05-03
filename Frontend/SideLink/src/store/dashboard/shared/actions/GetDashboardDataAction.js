import { axiosInstanceAuth } from 'src/api/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getDashboardData = createAsyncThunk('dashboard/getDashboardData', async (token, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstanceAuth(token).get(`/api/dashboard-data/`);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    return rejectWithValue({
      status: error.response?.status || 500,
      detail: errorMessage,
    });
  }
});

export default getDashboardData;
