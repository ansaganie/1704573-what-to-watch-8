import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'https://8.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (request): AxiosRequestConfig => {
      const token = getToken();

      if (token) {
        request.headers['x-token'] = token;
      }

      return request;
    },
  );

  return api;
};

export { createAPI };
