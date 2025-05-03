import { axiosInstanceBasic } from 'src/api/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

const login = createAsyncThunk('auth/userLogin', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstanceBasic.post('/api/auth/login/', { email, password });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    return rejectWithValue({
      status: error.response?.status || 500,
      detail: errorMessage,
    });
  }
});

export default login;
