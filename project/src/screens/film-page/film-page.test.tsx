import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getFakeFilm, getFakeFilms, getFakeReviews } from '../../utils/mock';
import * as reduxHooks from 'react-redux';
import * as useLoadFilm from '../../hooks/use-load-film';
import * as Header from '../../components/header/header';
import * as RelatedFilms from './components/related-films/related-films';
import * as dal from '../../services/dal';
import * as scroll from '../../utils/side-effects';
import { FilmPage } from './film-page';
import { AuthStatus } from '../../constants';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';


describe('Screen: Film Page', () => {
  it('should render correctly', () => {
    const film = getFakeFilm();
    const films = getFakeFilms();
    const reviews = getFakeReviews();
    const dispatch = jest.fn();
    const mockStore = configureMockStore();

    jest.spyOn(scroll, 'scrollToFilmTitle')
      .mockImplementation(() => jest.fn());
    jest.spyOn(reduxHooks, 'useDispatch')
      .mockImplementation(() => dispatch);
    jest.spyOn(Header, 'default')
      .mockImplementation(() => (<div/>));
    jest.spyOn(RelatedFilms, 'default')
      .mockImplementation(() => (<div/>));
    jest.spyOn(useLoadFilm, 'useLoadFilm')
      .mockImplementation(() => [ film, false]);
    jest.spyOn(dal, 'fetchRelatedFilms')
      .mockImplementation(() => Promise.resolve(films));

    const state = {
      film: {
        reviews: {
          [film.id]: reviews,
        },
      },
    };

    act(() => {
      render(
        <Provider store={mockStore(state)}>
          <Router history={createMemoryHistory()}>
            <FilmPage dispatch={jest.fn()} authStatus={AuthStatus.Auth}/>
          </Router>
        </Provider>,
      );
    });

    expect(screen.getByText(film.name)).toBeInTheDocument();
  });
});
