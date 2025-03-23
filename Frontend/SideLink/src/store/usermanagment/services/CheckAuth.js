import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'http://127.0.0.1:8000';

const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': document.cookie
          .split('; ')
          .find(row => row.startsWith('csrftoken='))
          ?.split('=')[1],
      },
    };
    // Send empty body since refresh token will be read from cookies
    const { data } = await axios.post(`${backendURL}/api/auth/refresh/`, {}, config);
    return data;
  } catch (error) {
    // return custom error message from backend if present
    if (error.response.status && error.response.data.detail) {
      return rejectWithValue({ status: error.response.status, detail: error.response.data.detail });
    } else {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
});

export default checkAuth;
