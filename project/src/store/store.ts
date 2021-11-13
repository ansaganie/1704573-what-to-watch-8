import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { rootReducer } from './root-reducer';
import { getToken } from '../services/token';
import { AuthStatus, HttpCode } from '../constants';
import { setAuthStatus, UserActions } from './user/user-actions';
import { unknownAction } from './unknown';
import { FilmActions } from './film/film-actions';
import { DataActions } from './data/data-actions';
import { AppActions } from './app/app-actions';

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

export type State = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type Actions =
  | ReturnType<typeof unknownAction>
  | FilmActions
  | DataActions
  | UserActions
  | AppActions;

export type AsyncAction<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>
export type AsyncDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export { api, store };
