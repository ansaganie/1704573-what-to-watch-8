import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { App } from './app';
import { AppRoute, BackendRoute } from './constants';
import { api, store } from './store/store';
import { getFakeServerFilms } from './utils/mock';

const mockApi = new MockAdapter(api);

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App initialize={jest.fn()} appInitialized/>
    </Router>
  </Provider>
);

describe('App component', () => {
  it('should render Main screen when navigate to "/"', () => {
    history.push(AppRoute.SignIn);
    const films = getFakeServerFilms();

    mockApi
      .onGet(BackendRoute.Films)
      .reply(200, films);

    mockApi
      .onGet(BackendRoute.PromoFilm)
      .reply(200, films[0]);

    render(fakeApp);

    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
  });
});
