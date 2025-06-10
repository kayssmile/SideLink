import { axiosInstanceBasicAuth } from 'src/api/AxiosInstance';

async function invalidateToken(token) {
  try {
    const response = await axiosInstanceBasicAuth.post('/api/auth/logout/', { refresh: token });
  } catch (error) {
    console.error(error);
  }
}

export default invalidateToken;
