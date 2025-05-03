import { axiosInstanceAuth } from 'src/api/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from 'src/services/AuthService';

const patchAccountDetails = createAsyncThunk('dashboard/patchAccountDetails', async (newUserData, { rejectWithValue }) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token nicht gefunden');
    }
    const { data } = await axiosInstanceAuth(token).patch(`/api/auth/registereduser/`, newUserData);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    console.log(error);
    return rejectWithValue({
      status: error.response?.status || 500,
      detail: errorMessage,
    });
  }
});

export default patchAccountDetails;
