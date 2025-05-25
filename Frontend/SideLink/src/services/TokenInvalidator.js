import { axiosInstanceBasicAuth } from 'src/api/AxiosInstance';

async function invalidateToken(token) {
  try {
    const response = await axiosInstanceBasicAuth.post('/api/auth/logout/', { refresh: token });
  } catch (error) {
    console.log(error);
    console.log('Token konnte nicht invalidiert werden');
  }
}

export default invalidateToken;
