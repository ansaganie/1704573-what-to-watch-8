import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './screens/main/main';
import SignIn from './screens/sign-in/sign-in';
import MyList from './screens/my-list/my-list';
import FilmPage from './screens/film-page/film-page';
import AddReview from './screens/add-review/add-review';
import Player from './screens/player/player';
import NotFound from './screens/not-found/not-found';
import { AppRoute } from './constants';
import PrivateRoute from './components/private-route/private-route';
import { AsyncDispatch } from './types/action';
import { checkAuthStatus } from './store/thunks';
import { connect, ConnectedProps } from 'react-redux';
import { State } from './types/state';
import React, { useEffect } from 'react';
import { setAppInitialized } from './store/action';
import Sprite from './components/sprite/sprite';

const mapStateToProps = (state: State) => ({
  appInitialized: state.appInitialized,
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  checkAuthorization() {
    return dispatch(checkAuthStatus());
  },
  initialize() {
    dispatch(setAppInitialized());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;


function App(props: AppProps): JSX.Element | null {
  const { appInitialized, checkAuthorization, initialize } = props;

  useEffect(() => {
    checkAuthorization()
      .then(() => initialize());
  }, [ checkAuthorization, initialize ]);

  if (!appInitialized) {
    return null;
  }

  return (
    <BrowserRouter>
      <Sprite/>
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
        />
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          render={() => <AddReview/>}
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
