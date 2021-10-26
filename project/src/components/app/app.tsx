import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import FilmPage from '../film-page/film-page';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import { AppRoute, AuthStatus } from '../../constants';
import PrivateRoute from '../private-route/private-route';
import { ThunkAppDispatch } from '../../types/action';
import { fetchFilms, fetchPromoFilm } from '../../store/thunks';
import { connect, ConnectedProps } from 'react-redux';
import { useEffect } from 'react';
import { setDataLoaded } from '../../store/action';
import { State } from '../../types/state';
import Spinner from '../spinner/Spinner';

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
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList/>}
          authorizationStatus={AuthStatus.NoAuth}
        />
        <Route path={AppRoute.FilmPage} exact>
          <FilmPage/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          render={() => <AddReview/>}
          authorizationStatus={AuthStatus.NoAuth}
        />
        <Route path={AppRoute.Player} exact>
          <Player/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
