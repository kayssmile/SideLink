import { axiosInstanceFormData } from './AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

const registerUser = createAsyncThunk('auth/registerUser', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstanceFormData.post('/api/auth/register/', formData);
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
