import { axiosInstanceAuth } from 'src/api/AxiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from 'src/services/AuthService';

const deletePublicService = createAsyncThunk('publicservice/deletePublicService', async (serviceId, { rejectWithValue }) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Token nicht gefunden');
    }
    const { data } = await axiosInstanceAuth(token).delete(`/api/publicservices/?id=${serviceId}`);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    return rejectWithValue({
      status: error.response?.status || 500,
      detail: errorMessage,
    });
  }
});

export default deletePublicService;
