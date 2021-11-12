import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { AppRoute } from './constants';
import { State } from './store/root-reducer';
import { AsyncDispatch } from './types/action';
import { initializeApp } from './store/app/app-thunks';
import Main from './screens/main/main';
import SignIn from './screens/sign-in/sign-in';
import MyList from './screens/my-list/my-list';
import FilmPage from './screens/film-page/film-page';
import AddReview from './screens/add-review/add-review';
import Player from './screens/player/player';
import NotFound from './screens/not-found/not-found';
import PrivateRoute from './components/private-route/private-route';
import Sprite from './components/sprite/sprite';

const mapStateToProps = (state: State) => ({
  appInitialized: state.app.appInitialized,
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  initialize() {
    dispatch(initializeApp());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;


function App(props: AppProps): JSX.Element | null {
  const { appInitialized, initialize } = props;

  useEffect(() => {
    initialize();
  }, [ initialize ]);

  if (!appInitialized) {
    return null;
  }

  return (
    <Switch>
      <Sprite/>
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
  );
}

export { App };
export default connector(App);
