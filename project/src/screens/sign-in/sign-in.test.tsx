import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { AppRoute, AuthStatus } from '../../constants';
import { getFakeUser } from '../../utils/mock';
import { SignIn } from './sign-in';
import * as header from '../../components/header/header';


const mockStore = configureMockStore();
const store = {
  user: {
    authStatus: AuthStatus.Auth,
    user: getFakeUser(),
  },
};

describe('Screen: Sign In', () => {
  it('should render correctly when "NoAuth"', () => {
    const signInText = 'Sign in';
    const history = createMemoryHistory();
    jest.spyOn(header, 'default')
      .mockImplementation(() => (<div/>));

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <SignIn
            authStatus={AuthStatus.NoAuth}
            signIn={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(signInText)).toBeInTheDocument();
  });

  it('should render correctly when "Auth"', () => {
    const mainPageMessage = 'This is main Page';
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Route exact path={AppRoute.Main}>
            <h1>{mainPageMessage}</h1>
          </Route>
          <SignIn
            authStatus={AuthStatus.Auth}
            signIn={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(mainPageMessage)).toBeInTheDocument();
  });
});
