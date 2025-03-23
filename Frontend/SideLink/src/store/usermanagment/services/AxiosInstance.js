import axios from 'axios';

const axiosInstanceFormData = axios.create({
  baseURL: import.meta.env.BASE_URL.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const axiosInstanceBasic = axios.create({
  baseURL: import.meta.env.BASE_URL.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosInstanceBasic, axiosInstanceFormData };
