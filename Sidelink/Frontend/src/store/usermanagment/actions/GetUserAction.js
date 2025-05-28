import { axiosInstanceAuth } from 'src/api/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getUser = createAsyncThunk('auth/getUser', async (token, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstanceAuth(token).get(`/api/auth/registereduser/`);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    return rejectWithValue({
      status: error.response?.status || 500,
      detail: errorMessage,
    });
  }
});

export default getUser;
