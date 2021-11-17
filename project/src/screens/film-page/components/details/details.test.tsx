import { render, screen } from '@testing-library/react';
import { formatFilmDuration } from '../../../../utils/date';
import { getFakeFilm } from '../../../../utils/mock';
import Details from './details';

describe('Screen: Film Page. Component: Details', () => {
  it('should render correctly', () => {
    const film = getFakeFilm();
    render(<Details film={film} />);

    expect(screen.getByText(film.director)).toBeInTheDocument();
    expect(screen.getByText(formatFilmDuration(film.runTime))).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released)).toBeInTheDocument();
  });
});
