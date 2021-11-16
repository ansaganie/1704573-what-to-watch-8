import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Link, Route, Router, Switch } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import { PrivateRoute } from './private-route';

describe('Component: Private Route', () => {
  it('should render correctly', () => {
    const privatePage = 'This is Private Route';
    const signInPage = 'This is Sign In Page';
    const text = 'Private Link';
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Switch>
          <PrivateRoute
            dispatch={jest.fn()}
            authStatus={AuthStatus.NoAuth}
            path={AppRoute.MyList}
            render={
              () => <h1>{privatePage}</h1>
            }
          />
          <Route exact>
            <h1>{signInPage}</h1>
          </Route>
        </Switch>
        <Link to={AppRoute.MyList}>{text}</Link>
      </Router>,
    );

    const link = screen.getByText(text);
    expect(link).toBeInTheDocument();

    link.parentElement?.click();
    expect(screen.getByText(signInPage)).toBeInTheDocument();
    expect(screen.queryByText(privatePage)).not.toBeInTheDocument();
  });
});
