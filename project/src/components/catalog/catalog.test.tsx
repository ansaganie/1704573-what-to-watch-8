import { act, render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { Catalog } from './catalog';
import { getFakeFilms } from '../../utils/mock';
import { distinctFilter } from '../../utils/film';

describe('Screen: Main. Component: Catalog', () => {
  it('should render correctly', () => {
    const films = getFakeFilms();
    const expectedFilmsLength = films.length > 8 ? 8 : films.length;
    const genres = films
      .map(({ genre }) => genre)
      .filter(distinctFilter);
    const expectedLinksCount = expectedFilmsLength + genres.length;
    const downloadFilms = jest.fn();
    const updateGenre = jest.fn();

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
