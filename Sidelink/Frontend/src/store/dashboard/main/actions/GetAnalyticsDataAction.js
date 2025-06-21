import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericAuthRequest } from 'src/services/GenericRequests';

const getAnalyticsData = createAsyncThunk('dashboard/getAnalyticsData', async (_, { rejectWithValue }) => {
  try {
    return await genericAuthRequest({ method: 'get', url: '/api/analytics-data/' });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default getAnalyticsData;
