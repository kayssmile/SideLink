import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericAuthRequest } from 'src/services/GenericRequests';

const patchAccountDetails = createAsyncThunk('dashboard/patchAccountDetails', async (newUserData, { rejectWithValue }) => {
  try {
    return await genericAuthRequest({ method: 'patch', url: '/api/auth/registered-user/', data: newUserData });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default patchAccountDetails;
