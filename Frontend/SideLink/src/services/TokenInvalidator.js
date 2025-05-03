import { axiosInstanceBasicAuth } from 'src/api/AxiosInstance';

async function invalidateToken() {
  //let accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axiosInstanceBasicAuth.post('/api/auth/logout/', {});
    //console.log(response);
  } catch (error) {
    console.log(error);
    console.log('Token konnte nicht invalidiert werden');
  }
}

export default invalidateToken;
