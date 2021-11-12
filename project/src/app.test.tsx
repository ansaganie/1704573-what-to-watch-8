import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { App } from './app';
import { AppRoute, AuthStatus } from './constants';

const mockStore = configureMockStore();
const store = mockStore({
  app: {
    genre: 'All genres',
    appInitialized: false,
  },
  user: {
    authStatus: AuthStatus.Unknown,
    user: null,
  },
  film: {
    myListButtonDisabled: false,
  },
  data: {
    films: [],
    promoFilmId: '',
    isFilmsLoading: true,
    isPromoFilmLoading: true,
  },
});
const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App initialize={jest.fn()} appInitialized={false}/>
    </Router>
  </Provider>
);

describe('App component', () => {
  it('should render Main screen when navigate to "/"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByText(/Sign in/)).toBeInTheDocument();
  });
});
