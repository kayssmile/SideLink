import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericRequest } from 'src/services/GenericRequests';

const getPublicData = createAsyncThunk('publicdata/getPublicData', async (_, { rejectWithValue }) => {
  try {
    return await genericRequest({ method: 'get', url: '/api/public-data/' });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default getPublicData;
