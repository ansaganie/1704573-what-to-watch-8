import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import { AppRoute } from '../../constants';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const copyright = '© 2021 What to watch Ltd.';
    const message = 'This is main page';
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Main}>
            <h1>{message}</h1>
          </Route>
        </Switch>
        <Footer/>
      </Router>,
    );

    expect(screen.getByText(copyright)).toBeInTheDocument();

    const homePageLink = screen.getByRole('link');

    expect(homePageLink).toBeInTheDocument();

    userEvent.click(homePageLink);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
