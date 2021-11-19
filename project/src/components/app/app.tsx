import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { initializeApp } from '../../store/app/app-thunks';
import { AsyncDispatch, State } from '../../store/store';
import { getAppInitialized, getServerNotWorking } from '../../store/app/app-selector';
import MainScreen from '../main-screen/main-screen';
import SignIn from '../sign-in-screen/sign-in';
import MyListScreen from '../my-list-screen/my-list-screen';
import FilmPage from '../film-page/film-page';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import Player from '../player-screen/player-screen';
import NotFound from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import Sprite from '../sprite/sprite';
import Spinner from '../spinner/Spinner';
import ServerNotWorking from '../server-not-working-screen/server-not-working';

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
          <MainScreen/>
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
          render={() => <MyListScreen/>}
        />
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          render={() => <AddReviewScreen/>}
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
