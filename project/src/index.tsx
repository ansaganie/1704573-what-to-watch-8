import './css/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { reducer } from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { AxiosError, AxiosResponse } from 'axios';
import { AuthStatus, HttpCode } from './constants';
import { setAuthStatus } from './store/action';

export const api = createAPI();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response } = error;

    if (response && response.status === HttpCode.Unauthorized) {
      store.dispatch(setAuthStatus(AuthStatus.NoAuth));
      return;
    }

    return Promise.reject(error);
  },
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
