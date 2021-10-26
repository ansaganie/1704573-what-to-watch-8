import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '../store/store';
import { AuthStatus } from '../constants';
import { setAuthStatus } from '../store/action';
import { getToken } from './token';

const BACKEND_URL = 'https://8.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

enum HttpCode {
  Unauthorized = 401,
}

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { response } = error;

      if (response && response.status === HttpCode.Unauthorized) {
        return store.dispatch(setAuthStatus(AuthStatus.NoAuth));
      }

      return Promise.reject(error);
    },
  );

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
