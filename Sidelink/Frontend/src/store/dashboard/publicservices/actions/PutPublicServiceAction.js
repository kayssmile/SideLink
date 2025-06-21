import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericAuthRequest } from 'src/services/GenericRequests';

const putPublicService = createAsyncThunk('publicservice/putPublicService', async (newServiceData, { rejectWithValue }) => {
  try {
    return await genericAuthRequest({ method: 'put', url: `/api/public-service/`, data: newServiceData });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default putPublicService;
