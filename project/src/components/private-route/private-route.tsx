import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute, AuthStatus } from '../../constants';
import { State } from '../../store/store';
import { getAuthStatus } from '../../store/user/user-selectors';

const mapStateToProps = (state: State) => ({
  authStatus: getAuthStatus(state),
});

const connector = connect(mapStateToProps);

type PrivateRouteProps = RouteProps &
  ConnectedProps<typeof connector> & {
  render: () => JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, render, authStatus } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authStatus === AuthStatus.Auth
          ? render()
          : <Redirect to={AppRoute.SignIn}/>
      )}
    />);
}

export { PrivateRoute };
export default connector(PrivateRoute);
