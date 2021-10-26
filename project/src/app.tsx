import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './screens/main/main';
import SignIn from './screens/sign-in/sign-in';
import MyList from './screens/my-list/my-list';
import FilmPage from './screens/film-page/film-page';
import AddReview from './screens/add-review/add-review';
import Player from './screens/player/player';
import NotFound from './screens/not-found/not-found';
import { AppRoute, AuthStatus } from './constants';
import PrivateRoute from './components/private-route/private-route';
import { AsyncDispatch } from './types/action';
import { checkAuthStatus } from './store/thunks';
import { connect, ConnectedProps } from 'react-redux';
import { State } from './types/state';
import { useEffect } from 'react';

const mapStateToProps = (state: State) => ({
  authStatus: state.authStatus,
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  checkAuthorization() {
    return dispatch(checkAuthStatus());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;


function App(props: AppProps): JSX.Element {
  const { authStatus, checkAuthorization } = props;

  useEffect( () => {
    if (authStatus === AuthStatus.Unknown) {
      checkAuthorization();
    }
  }, [ authStatus, checkAuthorization ]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main/>
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn/>
        </Route>
        <Route path={AppRoute.FilmPage} exact>
          <FilmPage/>
        </Route>
        <Route path={AppRoute.Player} exact>
          <Player/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList/>}
          authorizationStatus={AuthStatus.NoAuth}
        />
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          render={() => <AddReview/>}
          authorizationStatus={AuthStatus.NoAuth}
        />
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
