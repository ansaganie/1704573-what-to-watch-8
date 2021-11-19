import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { getFakeFilm } from '../../utils/mock';
import PlayButton from './play-button';

describe('Component: Play Button', () => {
  it('should render correctly', () => {
    const message = 'This is Player page';
    const text = 'Play';
    const film = getFakeFilm();
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Main}>
            <h1>{message}</h1>
          </Route>
        </Switch>
        <PlayButton filmId={film.id}/>
      </Router>,
    );

    const button = screen.getByText(text);
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
