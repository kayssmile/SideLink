import { axiosInstanceAuth } from 'src/api/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from 'src/services/AuthService';

const createPublicService = createAsyncThunk('publicservice/createPublicService', async (newServiceData, { rejectWithValue }) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token nicht gefunden');
    }
    const { data } = await axiosInstanceAuth(token).post(`/api/publicservices/`, newServiceData);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    return rejectWithValue({
      status: error.response?.status || 500,
      detail: errorMessage,
    });
  }
});

export default createPublicService;
