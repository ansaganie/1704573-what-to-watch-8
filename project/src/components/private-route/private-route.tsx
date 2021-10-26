import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: State) => ({
  authStatus: state.authStatus,
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
