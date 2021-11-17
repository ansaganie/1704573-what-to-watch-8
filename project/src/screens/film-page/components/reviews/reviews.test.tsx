import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getFakeFilm, getFakeReviews } from '../../../../utils/mock';
import * as hooks from 'react-redux';
import Reviews from './reviews';

describe('Screen: Film Page. Component: Reviews', () => {
  it('should render correctly', () => {
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
        <Reviews filmId={film.id}/>
      </Provider>,
    );

    const reviewElements = reviews.map(({comment}) => screen.getByText(comment));

    expect(reviewElements.length).toBe(reviews.length);
  });
});
