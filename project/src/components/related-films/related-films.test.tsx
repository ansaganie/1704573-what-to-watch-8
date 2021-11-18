import { render, screen, waitFor, act } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { getFakeFilm, getFakeFilms } from '../../utils/mock';
import * as dal from '../../services/dal';
import RelatedFilms from './related-films';

const MAX_RELATED_FILMS_COUNT = 4;

describe('Screen: Film Page. Component: Related Films', () => {
  it('should render correctly', async () => {
    const film = getFakeFilm();
    const films = getFakeFilms();
    const expectedLength = films.length > MAX_RELATED_FILMS_COUNT
      ? MAX_RELATED_FILMS_COUNT
      : films.length;

    jest.spyOn(dal, 'fetchRelatedFilms')
      .mockImplementation(() => Promise.resolve(films));

    act(() => {
      render(
        <Router history={createMemoryHistory()}>
          <RelatedFilms filmId={film.id}/>
        </Router>,
      );
    });

    await waitFor(() => {
      expect(screen.getAllByRole('link').length).toBe(expectedLength);
    });
  });
});
