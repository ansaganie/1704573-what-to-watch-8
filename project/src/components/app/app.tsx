import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../main/main';
import { Film } from '../../types/film';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import FilmPage from '../film-page/film-page';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import { AppRoute, AuthorizationStatus } from '../../constants';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  films: Film[],
}

function App({ films }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main films={films}/>
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList myList={films}/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route path={AppRoute.FilmPage} exact>
          <FilmPage relatedFilms={films.slice(0, 4)}/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          render={() => <AddReview/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
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

export default App;
