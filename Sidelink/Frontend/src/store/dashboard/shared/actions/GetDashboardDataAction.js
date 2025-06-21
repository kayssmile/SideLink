import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericAuthRequest } from 'src/services/GenericRequests';

const getDashboardData = createAsyncThunk('dashboard/getDashboardData', async (_, { rejectWithValue }) => {
  try {
    return await genericAuthRequest({ method: 'get', url: '/api/dashboard-data/' });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default getDashboardData;
