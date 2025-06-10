import { axiosInstanceBasic } from 'src/api/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getPublicprofile = createAsyncThunk('publicdata/getPublicprofile', async (publicProfileId, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstanceBasic.get(`/api/publicprofile/get/?id=${publicProfileId}`);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    return rejectWithValue({
      status: error.response?.status || 500,
      detail: errorMessage,
    });
  }
});

export default getPublicprofile;
