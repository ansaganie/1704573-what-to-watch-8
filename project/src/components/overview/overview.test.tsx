import { render, screen } from '@testing-library/react';
import { formatRating, getFilmRatingDescription } from '../../utils/film';
import { getFakeFilm } from '../../utils/mock';
import Overview from './overview';

describe('Screen: Film Page. Component: Overview', () => {
  it('should render correctly', () => {
    const film = getFakeFilm();
    render(<Overview film={film} />);

    expect(screen.getByText(formatRating(film.rating))).toBeInTheDocument();
    expect(screen.getByText(getFilmRatingDescription(film.rating))).toBeInTheDocument();
    expect(screen.getByText(`${film.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${film.director}`)).toBeInTheDocument();
  });
});
