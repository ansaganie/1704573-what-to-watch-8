import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import { AppRoute } from '../../constants';
import { getFakeFilm } from '../../utils/mock';
import FilmCard from './film-card';

describe('Component. Film Card', () => {
  it('should render correctly', () => {
    const message = 'This is film page';
    const film = getFakeFilm();
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.FilmPage}>
            <h1>{message}</h1>
          </Route>
        </Switch>
        <FilmCard film={film} />
      </Router>,
    );

    const titleElement = screen.getByText(film.name);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('A');
    titleElement.click();

    const headerElement = screen.getByText(message);

    expect(headerElement).toBeInTheDocument();
  });
});
