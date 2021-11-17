import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import { AppRoute } from '../../constants';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const logo = 'WT';
    const message = 'This is main page';
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Main}>
            <h1>{message}</h1>
          </Route>
        </Switch>
        <Logo/>
      </Router>,
    );

    expect(screen.getAllByText(logo[0]).length).toBe(2);
    expect(screen.getByText(logo[1])).toBeInTheDocument();

    const homePageLink = screen.getByRole('link');

    expect(homePageLink).toBeInTheDocument();

    userEvent.click(homePageLink);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
