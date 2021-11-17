import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getFakeFilm, getFakeReviews } from '../../../../utils/mock';
import * as hooks from 'react-redux';
import FilmTabs from './film-tabs';

describe('Screen: Film Page. Component: Film tabs', () => {
  it('should render correctly', () => {
    const overviewLabel = 'Overview';
    const detailsLabel = 'Details';
    const ReviewsLabel = 'Reviews';
    const dispatch = jest.fn();
    jest.spyOn(hooks, 'useDispatch')
      .mockImplementation(() => dispatch);

    const film = getFakeFilm();
    const reviews = getFakeReviews();
    const mockStore = configureMockStore();
    const state = {
      film: {
        reviews: {
          [film.id]: reviews,
        },
      },
    };

    render(
      <Provider store={mockStore(state)}>
        <FilmTabs film={film}/>
      </Provider>,
    );

    expect(screen.getByText(overviewLabel)).toBeInTheDocument();
    expect(screen.getByText(detailsLabel)).toBeInTheDocument();
    expect(screen.getByText(ReviewsLabel)).toBeInTheDocument();
  });
});
