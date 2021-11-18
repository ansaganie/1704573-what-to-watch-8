import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { getFakeFilm } from '../../utils/mock';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import * as hooks from '../../hooks/use-load-film';
import * as Header from '../header/header';
import * as sideEffects from '../../hooks/use-scroll-to-title';
import AddReview from './add-review';

const mockStore = configureMockStore();

describe('Screen: Add review', () => {
  it('should render correctly', () => {
    const film = getFakeFilm();
    jest.spyOn(hooks, 'default')
      .mockImplementation(() => [film, false]);
    jest.spyOn(Header, 'default')
      .mockImplementation(() => (<div/>));
    jest.spyOn(sideEffects, 'default')
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
    jest.spyOn(hooks, 'default')
      .mockImplementation(() => [null, false]);
    jest.spyOn(Header, 'default')
      .mockImplementation(() => (<div/>));
    jest.spyOn(sideEffects, 'default')
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
