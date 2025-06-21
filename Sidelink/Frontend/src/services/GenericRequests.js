import { axiosInstanceAuth, axiosInstanceBasic } from 'src/api/AxiosInstance';
import { getToken } from 'src/components/shared/utils/TokenUtils';

async function genericAuthRequest({ method, url, data = null }) {
  try {
    const token = getToken();
    if (!token) throw new Error('Token nicht gefunden');
    const axios = axiosInstanceAuth(token);
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    throw {
      status: error.response?.status || 500,
      detail: errorMessage,
    };
  }
}

async function genericRequest({ method, url, data = null }) {
  try {
    const response = await axiosInstanceBasic({ method, url, data });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
    throw {
      status: error.response?.status || 500,
      detail: errorMessage,
    };
  }
}

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

export { genericAuthRequest, genericRequest, basicPostRequest };
