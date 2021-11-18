import { act, render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { Catalog } from './catalog';
import { getFakeFilms } from '../../utils/mock';
import { distinctFilter } from '../../utils/film';

const MAX_FILM_COUNT = 8;

describe('Screen: Main. Component: Catalog', () => {
  it('should render correctly', () => {
    const films = getFakeFilms();
    const expectedFilmsLength = films.length > MAX_FILM_COUNT ? MAX_FILM_COUNT : films.length;
    const genres = films
      .map(({ genre }) => genre)
      .filter(distinctFilter);

    const downloadFilms = jest.fn();
    const updateGenre = jest.fn();
    const expectedLinksCount = expectedFilmsLength + genres.length;

    act(() => {
      render(
        <Router history={createMemoryHistory()}>
          <Catalog
            films={films}
            isFilmsLoading={false}
            genres={genres}
            activeGenre={genres[0]}
            downloadFilms={downloadFilms}
            updateGenre={updateGenre}
          />
        </Router>,
      );
    });

    const genreElements = genres.map((genre) => screen.getByText(genre));

    expect(genreElements.length).toBe(genres.length);
    expect(screen.getAllByRole('link').length).toBe(expectedLinksCount);
  });
});
