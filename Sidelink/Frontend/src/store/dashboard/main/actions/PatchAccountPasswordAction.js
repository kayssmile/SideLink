import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericAuthRequest } from 'src/services/GenericRequests';

const patchAccountPassword = createAsyncThunk('dashboard/patchAccountPassword', async (credentials, { rejectWithValue }) => {
  try {
    return await genericAuthRequest({ method: 'patch', url: '/api/auth/change-password/', data: credentials });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default patchAccountPassword;
