import { axiosInstanceBasic } from 'src/api/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

const registerUser = createAsyncThunk('auth/registerUser', async (newData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstanceBasic.post('/api/auth/register/', newData);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    return rejectWithValue({
      status: error.response?.status || 500,
      detail: errorMessage,
    });
  }
});

export default registerUser;
