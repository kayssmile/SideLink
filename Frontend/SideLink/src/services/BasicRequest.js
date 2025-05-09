import { axiosInstanceBasic } from 'src/api/AxiosInstance';

async function basicPostRequest(url, message) {
  try {
    const response = await axiosInstanceBasic.post(url, message);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    return {
      status: false,
      data: { status: error.response?.status || 500, detail: errorMessage },
    };
  }
}

export default basicPostRequest;
