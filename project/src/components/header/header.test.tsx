import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { AppRoute, AuthStatus } from '../../constants';
import Header from './header';

const mockStore = configureMockStore();
const store = {
  user: {
    authStatus: AuthStatus.NoAuth,
    user: null,
  },
};

describe('Component: Header', () => {
  it('should render correctly', () => {
    const messageHeader = 'This is header';
    const messageHomePage = 'This is main page';
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Main}>
              <h1>{messageHomePage}</h1>
            </Route>
          </Switch>
          <Header>
            <h2>{messageHeader}</h2>
          </Header>
        </Router>
      </Provider>,
    );
    const links = screen.getAllByRole('link');

    expect(links.length).toBe(2);

    expect(screen.getByText(messageHeader)).toBeInTheDocument();

    userEvent.click(links[0]);
    expect(screen.getByText(messageHomePage)).toBeInTheDocument();
  });
});
