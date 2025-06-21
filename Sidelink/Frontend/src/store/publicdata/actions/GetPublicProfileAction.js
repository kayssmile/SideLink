import { createAsyncThunk } from '@reduxjs/toolkit';
import { genericRequest } from 'src/services/GenericRequests';

const getPublicprofile = createAsyncThunk('publicdata/getPublicprofile', async (publicProfileId, { rejectWithValue }) => {
  try {
    return await genericRequest({ method: 'get', url: `/api/public-profile/get/?id=${publicProfileId}` });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default getPublicprofile;
