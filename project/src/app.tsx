import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { AppRoute } from './constants';
import { initializeApp } from './store/app/app-thunks';
import { AsyncDispatch, State } from './store/store';
import Main from './components/main/main';
import SignIn from './components/sign-in/sign-in';
import MyList from './components/my-list/my-list';
import FilmPage from './components/film-page/film-page';
import AddReview from './components/add-review/add-review';
import Player from './components/player/player';
import NotFound from './components/not-found/not-found';
import PrivateRoute from './components/private-route/private-route';
import Sprite from './components/sprite/sprite';
import Spinner from './components/spinner/Spinner';
import ServerNotWorking from './components/server-not-working/server-not-working';
import { getAppInitialized, getServerNotWorking } from './store/app/app-selector';

const mapStateToProps = (state: State) => ({
  appInitialized: getAppInitialized(state),
  serverNotWorking: getServerNotWorking(state),
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  initialize() {
    dispatch(initializeApp());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;


function App(props: AppProps): JSX.Element | null {
  const {
    appInitialized,
    serverNotWorking,
    initialize,
  } = props;

  useEffect(() => {
    initialize();
  }, [ initialize ]);

  if (serverNotWorking) {
    return <ServerNotWorking/>;
  }

  if (!appInitialized) {
    return <Spinner fullScreen/>;
  }

  return (
    <>
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
    </>
  );
}

export { App };
export default connector(App);
