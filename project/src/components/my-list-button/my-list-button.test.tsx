import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getFakeFilms } from '../../utils/mock';
import MyListButton from './my-list-button';

const TEST_FILM_INDEX = 5;

const mockStore = configureMockStore();
const store = {
  data: {
    films: getFakeFilms(),
  },
  film: {
    myListButtonDisabled: false,
  },
};

describe('Component: My List Button', () => {
  it('should render correctly', () => {
    const text = 'My list';
    const film = store.data.films[TEST_FILM_INDEX];

    render(
      <Provider store={mockStore(store)}>
        <MyListButton filmId={film.id} isFavorite={film.isFavorite}/>
      </Provider>,
    );

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
