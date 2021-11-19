import { act, render, screen } from '@testing-library/react';
import { distinctFilter } from '../../utils/film';
import { getFakeFilms } from '../../utils/mock';
import Genres from './genres';


describe('Screen: Main. Component: Genres', () => {
  it('should render correctly', () => {
    const genres = getFakeFilms()
      .map(({ genre }) => genre)
      .filter(distinctFilter);
    const activeGenreIndex = 0;

    const onGenreClick = jest.fn();

    act(() => {
      render(
        <Genres
          genres={genres}
          activeGenre={genres[activeGenreIndex]}
          onGenreClick={onGenreClick}
        />,
      );
    });

    const genreElements = genres.map((genre) => screen.getByText(genre));

    expect(genreElements.length).toBe(genres.length);
  });
});
