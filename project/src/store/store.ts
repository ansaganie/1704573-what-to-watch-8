import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { rootReducer } from './root-reducer';
import { getToken } from '../services/token';
import { AuthStatus, HttpCode } from '../constants';
import { setAuthStatus } from './user/user-actions';

const BACKEND_URL = 'https://8.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

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

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response } = error;

    if (response?.status === HttpCode.Unauthorized) {
      return store.dispatch(setAuthStatus(AuthStatus.NoAuth));
    }

    return Promise.reject(error);
  },
);


export { api, store };
