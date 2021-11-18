import { act, render, screen } from '@testing-library/react';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { AppRoute, AuthStatus } from './constants';
import { App } from './app';
import { getFakeFilms, getFakeReviews, getFakeUser } from './utils/mock';
import { Actions, api, State } from './store/store';

const fakeFilms = getFakeFilms();
const fakeReviews = getFakeReviews();
const fakeUser = getFakeUser();
const promoFilmIndex = 5;
const fakePromoFilm = fakeFilms[promoFilmIndex];

const state: State = {
  user: {
    authStatus: AuthStatus.Auth,
    user: fakeUser,
    myList: [...fakeFilms],
    isMyListLoading: false,
  },
  app: {
    genre: 'All genres',
    appInitialized: true,
    serverNotWorking: false,
  },
  data: {
    films: fakeFilms,
    promoFilmId: fakePromoFilm.id,
    isFilmsLoading: false,
  },
  film: {
    myListButtonDisabled: false,
    isFilmLoading: false,
    reviews: {
      [fakeFilms[promoFilmIndex].id]: fakeReviews,
    },
    isReviewsLoading: false,
    notFoundFilmId: '45646546',
  },
};

const handleAppInitialized = jest.fn();
const history = createMemoryHistory();
const middleware = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Actions,
  ThunkDispatch<State, typeof api, Actions>
>(middleware);

const store = mockStore(state);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App
        appInitialized
        serverNotWorking={false}
        initialize={handleAppInitialized}
      />
    </Router>
  </Provider>
);

describe('Component App', () => {

  afterAll(() => {
    store.clearActions();
  });

  it('should show Main Screen', () => {

    history.push(AppRoute.Main);

    act(() => {
      render(fakeApp);
    });

    expect(screen.getByText(state.app.genre)).toBeInTheDocument();
    expect(screen.getAllByText(fakePromoFilm.name).length).toBe(2);
  });

  it('should show Main Screen when auth', () => {
    history.push(AppRoute.SignIn);

    act(() => {
      render(fakeApp);
    });

    expect(screen.getByText(state.app.genre)).toBeInTheDocument();
    expect(screen.getAllByText(fakePromoFilm.name).length).toBe(2);
  });

  it('should show FilmPage Screen', () => {
    history.push(AppRoute.FilmPage.replace(':id', fakePromoFilm.id));

    act(() => {
      render(fakeApp);
    });

    expect(screen.getByText(fakePromoFilm.name)).toBeInTheDocument();
    expect(screen.getByText(fakePromoFilm.released)).toBeInTheDocument();
  });

  it('should show Player Screen', () => {
    const playButtonLabel = 'Play';

    history.push(AppRoute.Player.replace(':id', fakePromoFilm.id));

    act(() => {
      render(fakeApp);
    });

    expect(screen.getByText(playButtonLabel)).toBeInTheDocument();
  });

  it('should show Add Review Screen', () => {
    history.push(AppRoute.AddReview.replace(':id', fakePromoFilm.id));

    act(() => {
      render(fakeApp);
    });

    expect(screen.getByText(fakePromoFilm.name)).toBeInTheDocument();
  });

  it('should show My List Screen', () => {
    history.push(AppRoute.MyList);

    act(() => {
      render(fakeApp);
    });

    const filmTitleElements = fakeFilms.map(({name}) => screen.getByText(name));
    expect(filmTitleElements.length).toBe(fakeFilms.length);
  });

  it('should show Sign In Screen', () => {
    const passwordLabel = 'Password';
    const emailLabel = 'Email address';

    state.user.authStatus = AuthStatus.NoAuth;

    history.push(AppRoute.SignIn);

    act(() => {
      render(fakeApp);
    });

    expect(screen.getByPlaceholderText(passwordLabel)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(emailLabel)).toBeInTheDocument();
  });
});
