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
import { ThunkAppDispatch } from './types/action';
import { fetchFilms, fetchPromoFilm } from './store/thunks';
import { connect, ConnectedProps } from 'react-redux';
import { useEffect } from 'react';
import { setDataLoaded } from './store/action';
import { State } from './types/state';
import Spinner from './components/spinner/Spinner';

const mapStateToProps = (state: State) => ({
  isDataLoaded: state.isDataLoaded,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  initializeApp: () => {
    dispatch(fetchFilms());
    dispatch(fetchPromoFilm());
    dispatch(setDataLoaded());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;

function App(props: AppProps): JSX.Element {
  const { initializeApp, isDataLoaded } = props;

  useEffect(() => {
    initializeApp();
  }, [ initializeApp ]);

  if (!isDataLoaded) {
    return (
      <Spinner/>
    );
  }

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
