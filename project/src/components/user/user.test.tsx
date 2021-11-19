import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { AppRoute, AuthStatus } from '../../constants';
import { getFakeUser } from '../../utils/mock';
import User from './user';

const mockStore = configureMockStore();
const store = {
  user: {
    authStatus: AuthStatus.Auth,
    user: getFakeUser(),
  },
};

describe('Component: User', () => {
  it('should render correctly when authorized', () => {
    const signOutText = 'Sign out';
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <User/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(signOutText)).toBeInTheDocument();
  });

  it('should render correctly when unauthorized', () => {
    const messageSignInPage = 'This is Sign In page';
    const signInText = 'Sign in';
    const history = createMemoryHistory();

    const storeCopy = { ...store };
    storeCopy.user.authStatus = AuthStatus.NoAuth;

    render(
      <Provider store={mockStore(storeCopy)}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.SignIn}>
              <h1>{messageSignInPage}</h1>
            </Route>
          </Switch>
          <User/>
        </Router>
      </Provider>,
    );

    const link = screen.getByText(signInText);
    expect(link).toBeInTheDocument();

    userEvent.click(link);
    expect(screen.getByText(messageSignInPage)).toBeInTheDocument();
  });
});
