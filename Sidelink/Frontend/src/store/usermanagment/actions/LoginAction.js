import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericRequest } from 'src/services/GenericRequests';

const login = createAsyncThunk('auth/userLogin', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await genericRequest({ method: 'post', url: '/api/auth/login/', data: { email, password } });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default login;
