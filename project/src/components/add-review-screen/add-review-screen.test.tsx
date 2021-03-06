import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { getFakeFilm } from '../../utils/mock';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import * as hooks from '../../hooks/use-load-film';
import * as Header from '../header/header';
import * as useScrollToTitle from '../../hooks/use-scroll-to-title';
import AddReviewScreen from './add-review-screen';

const mockStore = configureMockStore();

describe('Screen: Add review', () => {
  it('should render correctly', () => {
    const film = getFakeFilm();
    jest.spyOn(hooks, 'default')
      .mockImplementation(() => [film, false]);
    jest.spyOn(Header, 'default')
      .mockImplementation(() => (<div/>));
    jest.spyOn(useScrollToTitle, 'default')
      .mockImplementation(jest.fn());

    render(
      <Provider store={mockStore(mockStore())}>
        <Router history={createMemoryHistory()}>
          <AddReviewScreen/>
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
    jest.spyOn(useScrollToTitle, 'default')
      .mockImplementation(jest.fn());

    render(
      <Provider store={mockStore()}>
        <Router history={createMemoryHistory()}>
          <AddReviewScreen/>
        </Router>
      </Provider>,
    );

    expect(screen.queryByAltText('poster')).not.toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
