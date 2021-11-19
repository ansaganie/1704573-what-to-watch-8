import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getFakeFilm, getFakeFilms } from '../../utils/mock';
import * as reduxHooks from 'react-redux';
import * as useLoadFilm from '../../hooks/use-load-film';
import * as Header from '../header/header';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Main from './main';
import { AuthStatus } from '../../constants';
import { Actions, api, State } from '../../store/store';
import { ThunkDispatch } from '@reduxjs/toolkit';

describe('Screen: Main', () => {
  it('should render correctly', () => {
    const film = getFakeFilm();
    const films = getFakeFilms();
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<
      State,
      Actions,
      ThunkDispatch<State, typeof api, Actions>
    >(middlewares);

    jest.spyOn(reduxHooks, 'useDispatch')
      .mockImplementation(() => jest.fn());
    jest.spyOn(Header, 'default')
      .mockImplementation(() => (<div/>));
    jest.spyOn(useLoadFilm, 'default')
      .mockImplementation(() => [ film, false]);

    const state = {
      data: {
        films: [...films],
        promoFilmId: film.id,
      },
      film: {
        myListButtonDisabled: false,
      },
      user: {
        authStatus: AuthStatus.Auth,
      },
      app: {
        genre: 'All genre',
      },
    };

    act(() => {
      render(
        <Provider store={mockStore(state)}>
          <Router history={createMemoryHistory()}>
            <Main/>
          </Router>
        </Provider>,
      );
    });

    expect(screen.getByText(film.name)).toBeInTheDocument();
  });
});
