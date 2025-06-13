import { axiosInstanceBasic, axiosInstanceBasicAuth, axiosInstanceBasicAuthC } from 'src/api/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

const login = createAsyncThunk('auth/userLogin', async ({ email, password }, { rejectWithValue }) => {
  try {
    let csrfToken = localStorage.getItem('csrfToken');
    //const { data } = await axiosInstanceBasicAuthC(csrfToken).post('/api/auth/login/', { email, password });
    const { data } = await axiosInstanceBasicAuth.post('/api/auth/login/', { email, password });
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
