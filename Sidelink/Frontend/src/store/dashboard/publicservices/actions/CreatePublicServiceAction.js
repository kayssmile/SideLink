import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericAuthRequest } from 'src/services/GenericRequests';

const createPublicService = createAsyncThunk('publicservice/createPublicService', async (newServiceData, { rejectWithValue }) => {
  try {
    return await genericAuthRequest({ method: 'post', url: '/api/public-service/', data: newServiceData });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default createPublicService;
