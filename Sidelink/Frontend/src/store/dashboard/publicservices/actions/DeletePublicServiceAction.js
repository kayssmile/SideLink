import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericAuthRequest } from 'src/services/GenericRequests';

const deletePublicService = createAsyncThunk('publicservice/deletePublicService', async (serviceId, { rejectWithValue }) => {
  try {
    return await genericAuthRequest({ method: 'delete', url: `/api/public-service/?id=${serviceId}` });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default deletePublicService;
