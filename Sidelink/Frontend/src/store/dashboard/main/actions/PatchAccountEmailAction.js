import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericAuthRequest } from 'src/services/GenericRequests';

const patchAccountEmail = createAsyncThunk('dashboard/patchAccountEmail', async (newEmail, { rejectWithValue }) => {
  try {
    return await genericAuthRequest({ method: 'patch', url: '/api/auth/registered-user/', data: newEmail });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default patchAccountEmail;
