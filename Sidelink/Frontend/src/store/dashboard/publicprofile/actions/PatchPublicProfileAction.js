import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericAuthRequest } from 'src/services/GenericRequests';

const patchPublicProfile = createAsyncThunk('publicprofile/patchPublicProfile', async (newFormData, { rejectWithValue }) => {
  try {
    return await genericAuthRequest({ method: 'patch', url: `/api/public-profile/`, data: newFormData });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default patchPublicProfile;
