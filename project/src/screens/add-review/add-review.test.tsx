import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { getFakeFilm } from '../../utils/mock';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import * as hooks from '../../hooks/use-load-film';
import * as Header from '../../components/header/header';
import * as sideEffects from '../../utils/side-effects';
import AddReview from './add-review';

const mockStore = configureMockStore();

describe('Screen: Add review', () => {
  it('should render correctly', () => {
    const film = getFakeFilm();
    jest.spyOn(hooks, 'useLoadFilm')
      .mockImplementation(() => [film, false]);
    jest.spyOn(Header, 'default')
      .mockImplementation(() => (<div/>));
    jest.spyOn(sideEffects, 'scrollToFilmTitle')
      .mockImplementation(jest.fn());

    const history = createMemoryHistory();
    render(
      <Provider store={mockStore(mockStore())}>
        <Router history={history}>
          <AddReview/>
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(`${film.name} poster`)).toBeInTheDocument();
  });

  it('should render correctly when film is null', () => {
    jest.spyOn(hooks, 'useLoadFilm')
      .mockImplementation(() => [null, false]);
    jest.spyOn(Header, 'default')
      .mockImplementation(() => (<div/>));
    jest.spyOn(sideEffects, 'scrollToFilmTitle')
      .mockImplementation(jest.fn());

    const history = createMemoryHistory();
    render(
      <Provider store={mockStore()}>
        <Router history={history}>
          <AddReview/>
        </Router>
      </Provider>,
    );

    expect(screen.queryByAltText('poster')).not.toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
