import { axiosInstanceBasic, axiosInstanceBasicAuth } from 'src/api/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getPublicData = createAsyncThunk('publicdata/getPublicData', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstanceBasicAuth.get(`/api/public-data/`);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    return rejectWithValue({
      status: error.response?.status || 500,
      detail: errorMessage,
    });
  }
});

export default getPublicData;
