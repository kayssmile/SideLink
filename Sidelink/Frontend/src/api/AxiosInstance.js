import axios from 'axios';

const baseURL = import.meta.env.BASE_URL.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';

const axiosInstanceBasic = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstanceBasicAuth = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

function axiosInstanceAuth(token) {
  return axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
/*
function axiosInstanceFormDataAuth(token) {
  return axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}  */

export { axiosInstanceBasic, axiosInstanceBasicAuth, axiosInstanceAuth };
