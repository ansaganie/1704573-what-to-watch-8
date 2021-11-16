import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { getFakeFilms } from '../../utils/mock';
import FilmsList from './films-list';

describe('Component: Film List', () => {
  it('should render correctly', () => {
    const films = getFakeFilms();
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <FilmsList films={films}/>
      </Router>,
    );

    expect(screen.getAllByRole('link').length).toBe(films.length);
  });
});
