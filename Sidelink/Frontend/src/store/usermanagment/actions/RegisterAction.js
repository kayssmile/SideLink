import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericRequest } from 'src/services/GenericRequests';

const registerUser = createAsyncThunk('auth/registerUser', async (newData, { rejectWithValue }) => {
  try {
    return await genericRequest({ method: 'post', url: '/api/auth/register/', data: newData });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default registerUser;
